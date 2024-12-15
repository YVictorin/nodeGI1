//you can make nodemon watch hbs files by this command: nodemon src/app.js -e js,hbs, also must be from the root folder of the app i.e. src
const path = require('path');
const express = require('express'); //express returns a single function
const hbs = require('hbs');
const weather = require('./utils/weather');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

const app = express();

//a static directory where we can put all the assets that will make our website
const publicDirectoryPath = path.join(__dirname, '../public');  //must be an absolute path by using __dirname
const viewsPath = path.join(__dirname, '../templates/views'); //express expects views/handlebars templates to live in a folder called views so we changed that here
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs')  //sets up the handlebars wrapper/hbs for dynamic templating i.e. dynamic html pages
app.set('views', viewsPath)  //points express to our renamed templates directory
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    //response will send rendered hbs back to the requester/browser
    res.render('index', {
        title: 'RWA',           //this object is what creates the dynamic html document
        name: 'Yonjou Victorin'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Yonjou Victorin'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'How can we help?',
        title: "Help",
        name: 'Yonjou Victorin'
    })
})


//app.com/weather
app.get('/weather', (req, res) => {
    const { _, units = 'f' } = req.query; // Default to 'f' if units not provided

    // Query String: an url that a person can send to the server

    if(!req.query.address) {                                    // info on the query string lives on the req object, it is also parsed by Express
        return res.send({
            error: 'You must provide a valid address',
        })
    }


    // if you use try to respond i.e. res.send, twice to a request you get an error message,
    // because HTTP requests can only have a single response go to the server and a single request that comes back
    // instead add a return like on line 49 or an else statement
    weather(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error: error,
            });
        }

        res.send({
            forecast: data.forecast,
            location: data.location,
            address: req.query.address,
        });
    }, units);
})


//catch all for only help 404s
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404 Help',
        name: 'Yonjou Victorin'
    })
})

//catch all 404 handler
//must be last since express looks from top down for any matches and the wildcard character is technically a match and would stop looking afterward
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: "Oops! You're lost.",
        title: '404',
        name: 'Yonjou Victorin'
    });
})


//starts our app's website on our computer only
app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
})