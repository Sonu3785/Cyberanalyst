const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');


const upload = multer({ dest: './uploads/' });
const router = express.Router();


// Example protected route - create an "item" (file upload + metadata)
router.post('/', auth, upload.single('file'), async (req, res) => {
// In a real app you'd save metadata to DB. We'll return minimal info.
const file = req.file;
const { title, description } = req.body;
res.json({
id: Date.now(),
ownerId: req.user.id,
title: title || null,
description: description || null,
filename: file ? file.filename : null,
originalName: file ? file.originalname : null
});
});


// Example public route
router.get('/', (req, res) => {
res.json({ message: 'List stub — implement DB-backed listing' });
});


module.exports = router;