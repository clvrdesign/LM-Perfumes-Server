const express = require('express');
const route = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Fetch all users
route.get('/', async (req, res) => {
    try {
        const users = await User.find();

        // Check if any users were found
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.json(users);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Fetch a user by ID
route.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        // Check if the user was found
        if (!user) {
            return res.status(404).json({ message: 'No user found' });
        }

        res.json(user);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a user
route.post('/', async (req, res) => {
    try {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(user.password, salt);

        const new_user = {
            name: user.name,
            email: user.email,
            password: hash
        }

        const newUser = await User.create(new_user);
        res.json(newUser);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a user
route.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
        res.json(updatedUser);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a user
route.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        res.json({ message: `${id} deleted successfully` });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = route;
