const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fetch = require("node-fetch");

dotenv.config();
const app = express();

const REMOTE_API_URL = process.env.SECRET_API_URL;
const API_KEY = process.env.SECRET_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Lahti Travel Guide server is running!');
});

// Api route
app.get('/api', (req, res) => {
  res.send('Lahti Travel Guide server is running!');
});

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

// API endpoint
app.post('/api', async (req, res) => {
  try {
    const response = await fetch(REMOTE_API_URL, {
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