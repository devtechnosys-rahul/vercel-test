// Load environment variables first
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Item = require('./models/Item');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb';

app.use(bodyParser.json());

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log('MongoDB connected'))
     .catch(err => console.error('MongoDB connection error:', err));

// GET all items
app.get('/items', async (req, res) => {
     try {
          const items = await Item.find();
          res.json(items);
     } catch (err) {
          res.status(500).json({ error: err.message });
     }
});

// POST a new item
app.post('/items', async (req, res) => {
     try {
          const newItem = new Item(req.body);
          const savedItem = await newItem.save();
          res.status(201).json(savedItem);
     } catch (err) {
          res.status(400).json({ error: err.message });
     }
});

app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
});
