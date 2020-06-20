var dotenv = require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var omdb = require("omdb");
var bitJs = require("bit_js");
var moment = require("moment");
// var keys = require("./key.js");
// const spotify = require("./key.js");


var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});




var artist = process.argv[3]
var track = process.argv[3]
var userCommand = process.argv[2]

var queryURL = "https://rest.bandsintown.com/artists/"
    + artist
    + "/events/?app_id=codingbootcamp"


function events() {
    axios
        .get(queryURL)
        .then(function (response) {

            var apiReturn = response.data


            for (var i = 0; i < apiReturn.length; i++) {

                if (typeof (apiReturn[i].artist) === "undefined") {
                    continue
                }

                console.log(apiReturn[i].artist.name)
                console.log(apiReturn[i].venue.city + ", " + apiReturn[i].venue.country)
                console.log(moment(apiReturn[i].datetime).format("MM/DD/YYYY"))
            }

            if (response = []) {
                console.log("Nothing to see here :(")
            }

        })
}


function spotifySong() {
    spotify.search({
        type: 'track',
        query: track,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('error occurred ' + err)
        }
        for(var i = 0; i < data.tracks.items.length; i++)
        console.log(data.tracks.items[i])
        console.log(data.tracks.items[i].artists[i].name)
    })
}

if (userCommand === "concert-this") {
    events()
} else if (userCommand === "spotify-this-song") {
    spotifySong()
}