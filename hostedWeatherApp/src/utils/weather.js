const request = require('postman-request');
const geocode = require('./geocode');


const getWeather = (address, callback, userUnits = 'f') => {
    let url = `https://api.weatherstack.com/current?access_key=09065ea378d52047f1bf5c7511d73164&query=&units=${userUnits}`;

    geocode(address, (error, data)=> {
        if (error) {
           callback(error, undefined);
        } else {
            url = `https://api.weatherstack.com/current?access_key=09065ea378d52047f1bf5c7511d73164&query=${data.latitude},${data.longitude}&units=${userUnits}`;
            request({url: url, json: true}, (error, response) => {
                if(error) {
                    callback('Could not retrieve weather data', undefined);
                } else if (response.body.error) {
                    callback('Unable to find location', undefined);
                } else {
                    let convertedUnits = '';

                    //converting units back to C, F, and K respectively
                    if(userUnits === 'm') {
                        convertedUnits = 'C';
                    } else {
                        convertedUnits = 'K';
                    }

                    if(userUnits === 'f') {
                        convertedUnits = 'F';
                    }

                    callback(undefined, {
                        forecast: `${response.body.current.weather_descriptions[0]}. The temperature is ${response.body.current.temperature} degrees ${convertedUnits}°  and feels like ${response.body.current.feelslike} degrees ${convertedUnits}° ` ,
                        location: data.location,
                    });
                }
            })

        }
    });

}

module.exports = getWeather;