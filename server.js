const express = require('express')
const mongoose = require('mongoose')
const Url = require('./models/url')
const app = express()
const ShortUniqueId = require('short-unique-id')
const uid = new ShortUniqueId({ length: 5 })

// Connecting to DB
mongoose.connect('mongodb://localhost/url-shortener')

// Express config
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))


// GET /
app.get('/', (req, res) => {
    res.render('index')
})

// POST fullUrl to server in order to create shortUrl
app.post('/shorten', async(req, res) => {
    if(!req.body.url) return res.json({ error: 'Please enter a url..' })
    const url = await Url.create({ 
        fullUrl: req.body.url,
        shortUrl: uid()
    })
    res.json({ url })
})

// GET shortened url
app.get('/:shortUrl', async(req, res) => {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl })
    if(url == null) return res.sendStatus(404)

    res.redirect(url.fullUrl)
})

app.listen(3000, () => console.log('Listening on port 3000'))