const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./geocode');
const forecast = require('./forecast');

const app = express();
const port = process.env.PORT || 3000;

//define path for express config
const publicDirectory = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

//setup handlebar engine and views location
app.set('views',viewPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req, res) => {
    res.render('index', {
       title: 'Weather App',
       name: 'Ashlesha Ashture'
    })
})
app.get('/about',(req, res) => {
    res.render('about', {
       title: 'About',
       name: 'Ashlesha Ashture'
    })
})
app.get('/help',(req, res) => {
    res.render('help', {
       title: 'Help',
       msg: 'This is a help message',
       name: 'Ashlesha Ashture'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/product', (req, res) => {
    if(!req.query.search) {
        return res.send({
            Error: 'You must provide a search item'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'help article not found',
        name: 'Ashlesha Ashture'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found',
        name: 'Ashlesha Ashture'
    });
})

app.listen(port, () => {
    console.log('server is up on port ' + port);
})