const express = require('express');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { registerSchema, loginSchema } = require('../utils/validators');
const config = require('../config');


const router = express.Router();


// Register
router.post('/register', asyncHandler(async (req, res) => {
const { error, value } = registerSchema.validate(req.body);
if (error) return res.status(400).json({ message: error.message });


const existing = await User.findOne({ where: { email: value.email } });
if (existing) return res.status(409).json({ message: 'Email already in use' });


const user = await User.create({ name: value.name, email: value.email, passwordHash: value.password });
const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '7d' });
res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
}));


// Login
router.post('/login', asyncHandler(async (req, res) => {
const { error, value } = loginSchema.validate(req.body);
if (error) return res.status(400).json({ message: error.message });


const user = await User.findOne({ where: { email: value.email } });
if (!user) return res.status(401).json({ message: 'Invalid credentials' });


const ok = await user.verifyPassword(value.password);
if (!ok) return res.status(401).json({ message: 'Invalid credentials' });


const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '7d' });
res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
}));


module.exports = router;