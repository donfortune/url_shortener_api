const express = require('express');
const Router = express.Router();
const urlController = require('../Controllers/urlController');

Router.get('/urls', urlController.getAllUrls);
Router.get('/url/:id', urlController.getUrl);
Router.post('/url', urlController.addUrl);
Router.post('/shorten', urlController.shortUrl);

module.exports = Router;