const Url = require('../models/UrlShortenModel')
const validUrl = require('valid-url')
const shortId = require('shortId')
const config = require('config')

// Post Original URL and change to Short 
exports.shortenPost = async (req, res ) => {
    
    const { urlLong } = req.body ;
    console.log(req.body, 'backend')
    
    const baseUrl = config.get('baseUrl')
    
    if(!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base url')
    }

    // Create Shorten URL
    const urlShorten = shortId.generate();

    // Chek Long URL
    if(validUrl.isUri(urlLong)) {
        try {
            let url = await Url.findOne({  urlLong })

            if(url) {
                res.json(url);
            } else {
                const urlShort = baseUrl + '/' + urlShorten;

                url = new Url({
                    urlLong,
                    urlShort,
                    urlShorten,
                    date: new Date()
                })

                await url.save();
                res.json(url)
            }
        } catch (err) {
            console.error(err)
            res.status(500).json('Server error')
        }
    } else {
        res.status(401).json('Invalid Long URL')
    }  
}


// Redirect to original URL
exports.getShortUrl = async (req, res ) => {
    try {
        const url = await Url.findOne({ urlShorten : req.params.shorturl })
        
        if(url) {
            return res.redirect(url.urlLong)
        } else {
            return res.status(404).json('No Url found')
        }
    } catch (err) {
        console.error(err)
        res.status(500).json('Server error')
    }
}