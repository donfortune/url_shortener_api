const Url = require('../Models/urlModel')
const mongoose = require('mongoose')
const shortid = require('shortid');


exports.getAllUrls = async (req, res) => {
    try {
        const urls = await Url.find()
        if (urls.length === 0) {
            return res.status(404).json({ message: 'No URLs found' })
        }
        res.json(urls)
    } catch (error) {
        console.error('Error fetching URLs:', error)
        res.status(500).json({ message: 'Internal server error' })
    }   
}

exports.getUrl = async (req, res) => {
    try {
        const url = await Url.findById(req.params.id)
        if (!url) {
            return res.status(404).json({ message: 'URL not found' })
        }
        res.json(url)
    } catch (error) {
        console.error('Error fetching URL:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

exports.addUrl = async (req, res) => {
    try {
        const originalUrl = req.body.originalUrl;
        const shortUrl = req.body.shortUrl;

        if (!originalUrl || !shortUrl) {
            return res.status(400).json({ message: 'originalUrl and shortUrl are required' });
        }

        const newUrl = new Url({
            originalUrl,
            shortUrl
        });

        await newUrl.save();
        res.status(201).json(newUrl);
    } catch (error) {
        console.error('Error adding URL:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.shortUrl = async (req, res) => {
    try {
        const originalUrl = req.body.originalUrl;
        const shortUrl = shortid.generate();

        if (!originalUrl) {
            return res.status(400).json({ message: 'originalUrl is required' });
        }

        const newUrl = new Url({
            originalUrl,
            shortUrl
        });

        await newUrl.save();
        res.status(201).json({
            shortUrl: `${req.protocol}://${req.get('host')}/${shortUrl}`,
        });
    } catch (error) {
        console.error('Error generating short URL:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}