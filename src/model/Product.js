const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);