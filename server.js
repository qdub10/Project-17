const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const responseHandler = require('./middleware/responseHandler'); // Import the middleware

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the responseHandler middleware
app.use(responseHandler);

// API routes
app.use('/api', routes);

// Database connection
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`🌍 Server running on http://localhost:${PORT}`);
  });
});

db.on('error', (err) => {
  console.error(`❌ MongoDB connection error: ${err}`);
});
