const express = require('express');
const {
    addProduct,
    updateProductQuantity,
    deleteProduct,
    getProducts,
    getProductById,
} = require('../Controller/productController');

const router = express.Router();

router.post('/products', addProduct);
router.patch('/products/:id/quantity', updateProductQuantity);
router.delete('/products/:id', deleteProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);

module.exports = router;