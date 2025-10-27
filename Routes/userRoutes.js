const express = require('express');
const Router = express.Router();
const userController = require('../Controllers/userController');
const authMiddleware = require('/Users/mac/url_shortener/Middlewares/authMiddlewares.js');

Router.get('/users', userController.getAllUsers);
Router.get('/user/urls/:id', userController.getUserUrls);
Router.post('/register', userController.registerUser);
Router.post('/login', userController.loginUser);

module.exports = Router;