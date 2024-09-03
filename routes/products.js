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

// Fetch a product by ID
route.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

        // Check if the product was found
        if (!product) {
            return res.status(404).json({ message: 'No product found' });
        }

        res.json(product);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a product
route.post('/', async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image,
            quantity: req.body.quantity
        }
        const newProduct = await Product.create(product);
        res.json(newProduct);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a product
route.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.body.image,
            quantity: req.body.quantity
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.json(updatedProduct);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a product
route.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Product.findByIdAndDelete(id);
        res.json({ message: `${id} deleted successfully` });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = route;
