const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fetch = require("node-fetch");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const API_URL = 'https://api.businessfinland.fi/traveldatahub';
const API_KEY = process.env.SECRET_KEY;

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

// API endpoint
app.post('/api', async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'ocp-apim-subscription-key':API_KEY
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});