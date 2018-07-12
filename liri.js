require("dotenv").config();
var keys = require('./keys.js')
var twitreq = require('twitter');
var spotreq = require('node-spotify-api');
var request = require('request');
var file = require('fs')
var spotify = new spotreq(keys.spotify);
var client = new twitreq(keys.twitter);
var option = process.argv[2];
var cmd = process.argv[3];
function tweeter() {
    client.get('search/tweets', {
        q: 'garrett41560380',
        count: '20'
    }, function (error, tweets, response) {
        if (error) {
            console.log(error)
            return;
        } else {
            for (i = 0; i < tweets.statuses.length; i++) {
                console.log('/////////////////////////////////////////')
                console.log('created: ' + tweets.statuses[i].created_at);
                console.log("")
                console.log(tweets.statuses[i].text);
            }
        }
    });
}
var song = "";
if (option === "do"){
    file.readFile("random.txt", 'utf8', function(err, data){
        if(err){
            console.log(err);
            return;
        }
            spotsearch(rndarr = data.split(','), option=rndarr[0], song=rndarr[1])
    })
}
if (cmd === undefined) {
    song = "The Sign, Ace of Base";
} 
else {
    song = cmd;
}
function spotsearch() {
    spotify.search({
        type: "track",
        query: song
    }, function (error, data) {
        if (error) {
            console.log(error);
            return;
        } else {
            var songInfo = data.tracks.items[0];
            if (!songInfo) {
                var errorStr = 'ERROR: No song info retrieved!';
                console.log(errorStr);
                return;
            } else {
                var spotstr = '------------------------\n' +
                    'Song Information:\n' +
                    '------------------------\n\n' +
                    'Song Name: ' + songInfo.name + '\n' +
                    'Artist: ' + songInfo.artists[0].name + '\n' +
                    'Album: ' + songInfo.album.name + '\n' +
                    'Preview Here: ' + songInfo.preview_url + '\n';
                console.log(spotstr);
            }
        }
    });
}
var movie = "";
if (cmd === undefined) {
    movie = "mr nobody";
} else {
    movie = cmd;
}
function omdb() {
    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var easyomdb = JSON.parse(body)
            var omdbstr = '------------------------\n' +
                'Movie Information\n\n' +
                '------------------------\n' +
                'Movie Title: ' + easyomdb.Title + '\n' +
                'Release Date: ' + easyomdb.Released + '\n' +
                'IMDB Rating: ' + easyomdb.imdbRating + '\n' +
                'Rotten Tomatoes: ' + easyomdb.Ratings[1].Value + '\n' +
                'Country: ' + easyomdb.Country + '\n' +
                'Language: ' + easyomdb.Language + '\n' +
                '------------------------\n' +
                '--------Plot---------\n' +
                '------------------------\n' +
                easyomdb.Plot + '\n' +
                '------------------------\n' +
                'Actors: ' + easyomdb.Actors;
            console.log(omdbstr);
        }
    });
}
switch (option) {
    case "twitter":
        tweeter();
        break;
    case "spotify":
        spotsearch();
        break;
    case "omdb":
        omdb();
        break;
}