const User = require('../Models/userModel');
const url = require('../Models/urlModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
}

exports.getUserUrls = async (req, res) => {
    try {
        const userId = req.params.id;
        const urls = await url.find({ userId });
        console.log(urls);
        if (urls.length === 0) {
            return res.status(404).json({ message: 'No URLs found for this user' });
        }
        res.status(200).json(urls);
    } catch (error) {
        console.error('Error fetching user URLs:', error);
        res.status(500).json({ message: 'Error fetching user URLs', error });
    }
}

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', user, token });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user', error });
    }
}
