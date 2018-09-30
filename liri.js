require("dotenv").config();

var keys = require('./keys.js');
var request = require('request');
var fs = require('fs');

var nodeArgv = process.argv;
var command = process.argv[2];

// Search for a movie
var search = "";

// Allows for multiple word searches within process.argv
for (var i = 3; i < nodeArgv.length; i++) {
    if(i > 3 && i < nodeArgv.length) {
        search = search + "+" + nodeArgv[i];
    } else{
        search = search + nodeArgv[i];
    }
}

// If user enters movie name, case 1. If not, default case.
switch(command){

    case "movie-this":
        if(search) {
            movieThis(search);
        } else {
            movieThis("Mr. Nobody");
        }
    break;

    default:
        console.log("Start by searhcing with 'movie-this'");
    break;
}

// Retrieves movie data
function movieThis(movie) {
    var queryURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';

    request(queryURL, function (error, response, body) {
        if(!error && response.statusCode == 200) {
            var body = JSON.parse(body);
            console.log("Title: " + body.Title);
            console.log("Year of release: " + body.Year);
            console.log("IMDB Rating: " + body.imdbRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            fs.appendFile('log.txt', "Title: " + body.Title);
            fs.appendFile('log.txt', "Year of release: " + body.Year);
            fs.appendFile('log.txt', "IMDB Rating: " + body.imdbRating);
            fs.appendFile('log.txt', "Country: " + body.Country);
            fs.appendFile('log.txt', "Language: " + body.Language);
            fs.appendFile('log.txt', "Plot: " + body.Plot);
            fs.appendFile('log.txt', "Actors: " + body.Actors);

    } else {
        console.log('Error occurred.')
    }
    // Default movie if no movie is inputted
    if(movie === "Mr. Nobody") {

        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
        fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
        fs.appendFile('log.txt', "It's on Netflix!");
    }
  });
}