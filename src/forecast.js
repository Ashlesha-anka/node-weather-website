const request = require('request');

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=f6c88ffeb0f18e247e5dea4fb871a026&query=' + latitude + ',' + longitude;/* + '&units=C';*/

    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('unable to connect to the geocode service...', undefined)
        }else if(body.error){
            callback('unable to find location...', undefined);
        } else {
            callback(undefined, (body.current.weather_descriptions[0] + ' it is currently ' + body.current.temperature + ' degrees out. it feels like ' + body.current.feelslike + ' degrees out.'));
        }
    })
}

module.exports = forecast;