require("dotenv").config();
require("node-spotify-api");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);


var axios = require("axios");
var omdb = require("omdb");
var bit = require("bit_js");
var moment = require("moment");
var dotenv = require("dotenv");