const request = require('postman-request');
const geocode = require('./geocode');


const getWeather = (address, callback) => {
    let url = `https://api.weatherstack.com/current?access_key=297f546eb82e67df33b3bf0237204887&query=&units=f`

    geocode(address, (error, data)=> {
        if (error) {
           callback(error, undefined);
        } else {
            url = `https://api.weatherstack.com/current?access_key=297f546eb82e67df33b3bf0237204887&query=${data.latitude},${data.longitude}&units=f`;
            request({url: url, json: true}, (error, response) => {
                if(error) {
                    callback('Could not retrieve weather data', undefined);
                } else if (response.body.error) {
                    callback('Unable to find location', undefined);
                } else {
                    // callback(undefined, `${data.location}\n${response.body.current.weather_descriptions[0]}. The temperature is ${response.body.current.temperature} degrees and feels like ${response.body.current.feelslike} degrees`)
                    callback(undefined, {
                        forecast: `${response.body.current.weather_descriptions[0]}. The temperature is ${response.body.current.temperature} degrees and feels like ${response.body.current.feelslike} degrees`,
                        location: data.location,
                    });
                }
            })

        }
    });

}

module.exports = getWeather;