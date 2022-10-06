const request = require('request');

const geocode = (address, callback) => {

const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXNobGVzaGFhc2h0dXJlIiwiYSI6ImNsOG1vY2x4djFzNmkzd281ZmY2OHg4bzMifQ.KGpm3sVvg43D7EQaPV-NOg&limit=1';

request({ url, json: true }, (error, {body}) => {
    if(error){
        callback('unable to connect to the geocode service...', undefined)
    } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
        callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })
        // callback(undefined, {'longitude : ' + response.body.features[0].center[0] + ' , latitude : ' + response.body.features[0].center[1] + ' , location : ' +  response.body.features[0].place_name));
    }
})
}
 module.exports = geocode


// const add=(a, b, callback) => {
//     setTimeout(() => {
//         callback(a+b);
//     }, 2000)
// }

// add(1, 4, (sum) => {
//     console.log(sum);
// })