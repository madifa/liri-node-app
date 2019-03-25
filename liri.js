require("dotenv").config();

var axios = require("axios");

var keys = require("./keys.js");

var go = process.argv[2];
var value = process.argv.slice(3).join("");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);



switch(go) {
    case "concert-this":
    concert();
    break;

    case "spotify-this-song":
    spotify();
    break;

    case "movie-this":
    movie();
    break;

    case "do-what-it-says":
    femaledog();
    break;
}


function concert() {

    var artist = value;

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(
        function(concertResponse){

            for(var i =0; i < concert.data.length; i++) {

                
            var concert = conertResponse.data.venue[i]
                console.log(concert.venue[i].name)
               // console.log(concert.venue[i].region + " " + concert.venue[i].city)
                //console.log(concert.venue[i].datatime)
            }
        }
    )
}









//OMDB

function movie() {


        var movieInput = "";
    
    if(value == ""){
        
            movieInput = "mr.nobody"}
            else{ 
                movieInput = value
        }
    
    axios.get("http://www.omdbapi.com/?t=" + movieInput + "&apikey=d058edb1&")
    .then(
        function(response) {
            let movie = response.data 
          console.log(movie);
        
        }
)};





function songs() {

   
    spotify.search({
        type: 'track',
        query: value
    }).then(function(response) {
        console.log(response);
    })
    .catch(function(err) {
        console.log(err);
    })
    }
   

console.log();
