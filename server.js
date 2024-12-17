const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use(routes);

// Start server and connect to MongoDB
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Server running on http://localhost:${PORT}`);
    console.log('🚀 MongoDB connected successfully!');
  });
});

db.on('error', (err) => {
  console.error(`❌ MongoDB connection error: ${err}`);
});