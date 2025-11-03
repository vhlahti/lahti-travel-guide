const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fetch = require('node-fetch');
const mongoose = require('mongoose');

dotenv.config();

// Hidden .env variables
const REMOTE_API_URL = process.env.SECRET_API_URL;
const API_KEY = process.env.SECRET_KEY;
const DB_URL = process.env.MONGODB_URL;
const allowedOrigin = process.env.ORIGIN;

// Connect MongDB Atlas
const connectDB = async () => {
    try {
       mongoose.set('strictQuery', false);
       await mongoose.connect(DB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
       });
       console.log("MongoDB connected");
    } catch (error) {
       console.error("Error connecting to MongoDB:", error);
       process.exit(1);
    }
};
connectDB();

// Middleware
const app = express();
app.use(express.json());

// CORS configuration
// Allow only specific origins (secure)
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigin.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Root route
app.get('/', (req, res) => {
  res.send('Lahti Travel Guide server is running!');
});

// API route
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

// Log server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

