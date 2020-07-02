const express = require('express')
const router = express.Router()

const { shortenPost, getShortUrl } = require('./../controllers/UrlShortenControllers')


// @route   POST /api/shorten
// @desc    Create short URL
router.post('/shorten', shortenPost )

// @route   GET :shortenurl
// @desc     Redirect to original url
router.get('/:shorturl', getShortUrl)

module.exports = router;