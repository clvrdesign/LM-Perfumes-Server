const express = require('express');
const route = express.Router();
const Product = require('../models/product');

// Fetch all products
route.get('/', async (req, res) => {
    try {
        const products = await Product.find();

        // Check if any products were found
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.json(products);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch all products
route.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id);

        // Check if any products were found
        if (product.length === 0) {
            return res.status(404).json({ message: 'No product found' });
        }

        res.json(product);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = route;
