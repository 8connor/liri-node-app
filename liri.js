require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
const key = require("./key.js");


var spotify = new Spotify(key.spotify);

var artist = process.argv[3]
var track = process.argv[3]
var userMovie = process.argv[3]
var userCommand = process.argv[2]


var queryURL = "https://rest.bandsintown.com/artists/"
    + artist
    + "/events/?app_id=codingbootcamp"

function events() {
    axios
        .get(queryURL)
        .then(function (response) {
            
            var events = response.data
            

            for (var i = 0; i < events.length; i++) {

                if (typeof (events[i].artist) === "undefined") {
                    continue
                }

                console.log("Name of artist: " + events[i].artist.name)
                console.log("location (city, country): " + events[i].venue.city + ", " + events[i].venue.country)
                console.log("Date of event: " + moment(events[i].datetime).format("MM/DD/YYYY"))
            }

            if (!events.length) {
                console.log("Nothing to see here :(")
            }

        })
}

function spotifySong() {
    spotify.search({
        type: 'track',
        query: track,
        limit: 5
    }, function (err, data) {

        var likelyTrack;
        var mostPop = 0;

        if (err) {
            return console.log('error occurred ' + err)
        }
        
        for (var i = 0; i < data.tracks.items.length; i++) {
            if(mostPop === 0){
                likelyTrack = data.tracks.items[i]
                mostPop = data.tracks.items[i].popularity
            } else if (data.tracks.items[i].popularity > mostPop){
                likelyTrack = data.tracks.items[i]
                mostPop = data.tracks.items[i].popularity
            }
        }

        console.log("Track name: " + likelyTrack.name)
        console.log("Name of album: " + likelyTrack.album.name)
        console.log("Name of artist: " + likelyTrack.artists[0].name)
        console.log("Popularity score: " + mostPop)
        console.log("Url: " + (likelyTrack.preview_url === null ? "unavailable" : likelyTrack.preview_url))

    })
}

if(!userMovie){
    
    userMovie = "mr nobody"
}

var queryURL2 = "http://www.omdbapi.com/?t="
+ userMovie 
+ "&apikey=fbbf50d6"

function movie(){
    axios
    .get(queryURL2)
    .then(function (response){
        var movie = response.data

        console.log("Title: " + movie.Title)
        console.log("Year released: " + movie.Year)
        console.log("IMDB rating: " + movie.imdbRating)
        console.log("Rotten Tomatoes rating: " + (typeof movie.Ratings[0] === "undefined" || typeof movie.Ratings[1] === "undefined" || typeof movie.Ratings[2] === "undefined" ? "unavailable" : movie.Ratings[1].Value))
        console.log("Country the movie was produced: " + movie.Country)
        console.log("Language: " + movie.Language)
        console.log("Plot of the movie: " + movie.Plot)
        console.log("Cast: " + movie.Actors)

    })
}


if (userCommand === "concert-this") {
    events();
} else if (userCommand === "spotify-this-song") {
    spotifySong();
}else if(userCommand === "movie-this"){
    movie();
}else{
    console.log("invalid command! please type \"concert-this\" spotify-this-song followed by an argument.")
};