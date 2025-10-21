const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');

env.config();

mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const server = express();
const PORT = process.env.PORT 

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);;
});

