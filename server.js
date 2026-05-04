require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3500;

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use('/states', require('./routes/stateRoutes'));

app.all('/{*path}', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    return res.sendFile(path.join(__dirname, 'views', '404.html'));
  }
  res.json({ error: '404 Not Found' });
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});