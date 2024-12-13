const request = require("postman-request");


const geocode = (address, callback) => {
    const url  = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(address)}&access_token=pk.eyJ1IjoieXZpY3RvcjAiLCJhIjoiY200ZzBqeTY0MG9mZDJrcHB0MGFxb2pmYyJ9.vY4L1VSM1O5-6cyPdn_VkQ&limit=1`
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to location services', undefined);
        } else if(response.body.features.length === 0) {
            callback('Location could not be found', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].properties.coordinates.latitude,
                longitude: response.body.features[0].properties.coordinates.longitude,
                location: response.body.features[0].properties.full_address,
            });
        }
    })
}

module.exports = geocode;