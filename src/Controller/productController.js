const Product = require('../model/Product');
const EventLog = require('../model/EventLog');

// Add a New Product
exports.addProduct = async(req, res) => {
    const { name, quantity, category } = req.body;

    try {
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(400).json({ message: 'Product with this name already exists' });
        }

        const product = new Product({ name, quantity, category });
        await product.save();

        // Optional: Log the event
        await EventLog.create({ action: 'added', productId: product._id });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Product Quantity
exports.updateProductQuantity = async(req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity < 0) {
        return res.status(400).json({ message: 'Quantity cannot be negative' });
    }

    try {
        const product = await Product.findByIdAndUpdate(id, { quantity }, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Optional: Log the event
        await EventLog.create({ action: 'updated', productId: id });

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Product
exports.deleteProduct = async(req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (product.quantity > 0) {
            return res.status(400).json({ message: 'Cannot delete a product with non-zero quantity' });
        }

        await Product.findByIdAndDelete(id);

        // Optional: Log the event
        await EventLog.create({ action: 'deleted', productId: id });

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve Products
exports.getProducts = async(req, res) => {
    const { category, minQuantity, maxQuantity, page = 1, limit = 10 } = req.query;

    const query = {};
    if (category) query.category = category;
    if (minQuantity) query.quantity = { $gte: minQuantity };
    if (maxQuantity) query.quantity = {...query.quantity, $lte: maxQuantity };

    try {
        const products = await Product.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve Product by ID
exports.getProductById = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};