const express = require('express');

const app = express();


const mongoose = require('mongoose');
const env = require('dotenv');
const urlRoutes = require('./Routes/urlRoutes');
const userRoutes = require('./Routes/userRoutes');



env.config();

mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(express.json());
app.use('/api/v1', urlRoutes);
app.use('/api/v1', userRoutes);


const PORT = process.env.PORT 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);;
});

