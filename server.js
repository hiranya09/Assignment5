// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/aihub', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Define User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Serve static files
app.use(express.static(__dirname));

// Registration route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'User with this email already exists' });
        }

        // Create a new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        // Return success message
        res.status(201).send({ message: 'Registration successful' });
    } catch (err) {
        res.status(500).send({ message: 'Error registering user', error: err.message });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    try {
        // Check if user exists and password matches
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        // Return success message
        res.status(200).send({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).send({ message: 'Error logging in', error: err.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(Server running on http://localhost:${PORT});
});
