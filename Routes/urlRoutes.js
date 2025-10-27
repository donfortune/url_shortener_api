const express = require('express');
const Router = express.Router();
const urlController = require('../Controllers/urlController');
const authMiddleware = require('/Users/mac/url_shortener/Middlewares/authMiddlewares.js');

Router.get('/urls', urlController.limiter, urlController.getAllUrls);
Router.get('/url/:id', urlController.getUrl);
Router.post('/url', urlController.addUrl);
Router.post('/shorten', urlController.limiter, authMiddleware.protectRoutes, urlController.shortUrl);

module.exports = Router;