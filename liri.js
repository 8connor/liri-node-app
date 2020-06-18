require("dotenv").config();
// require("node-spotify-api");
// require("axios");
// require("omdb");
// require("bit_js");
// require("moment");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

// var artist = process.argv[3].trim()

// var queryURL = "https://rest.bandsintown.com/artists/" 
// + artist 
// + "/events?app_id=codingbootcamp"

// axios.get(queryURL).then(function (response) {
//     console.log(response)
// })

// console.log("123")