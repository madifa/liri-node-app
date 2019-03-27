require("dotenv").config();


//VARIABLES
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var test = new Spotify(keys.spotify);
//format time properly
var moment = require("moment");
var fs = require("fs");


var input = process.argv.slice(3).join("+");
var go = process.argv[2];



  function run() {
  
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
    dowhat();
    break;

    default:
    console.log("invalid comment")

}
  }
run()



    //concert
function concert() {

    var artist = input;

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(
        function(concertResponse){

            for(var i =0; i < concertResponse.data.length; i++) {

                
            var concert = concertResponse.data[i].venue
            console.log("Concert Date: " + moment(concert.datetime).format("L"));
            console.log("Venue Name: " + concert.name);
            console.log("Venue City: " + concert.city); 
            }
        }
    )
}









//OMDB

function movie(go) {


        var movieInput = "";
    
    if(go == ""){
        
            movieInput = "mr.nobody"}
            else{ 
                movieInput = go
        }
    
    axios.get("http://www.omdbapi.com/?t=" + movieInput + "&apikey=d058edb1&")
    .then(
        function(response) {
         console.log("Title: " + response.data.Title);
          console.log("Release Year: " + response.data.Year);
          console.log("Imdb Rating: " + response.data.imdbRating);
          console.log("Rotten Tomatoes Score: " + response.data.Ratings[0].Value);
          console.log("Country: " + response.data.Country);
         console.log("Language: " + response.data.Language);
          console.log("Plot: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);


        
        }
)};



//spotify for songs

function spotify() {

   
    test.search({
        type: 'track',
        query: input,
        limit: 1
    }).then(function(response) {
     console.log("Artists: " + response.tracks.items[0].album.artists[0].name);
     console.log("Song Name: " + response.tracks.items[0].name);
     console.log("song Preview: " + response.tracks.items[0].preview_url);
     console.log("Album Name: " + response.tracks.items[0].album.name)

        
    })
    .catch(function(err) {
        console.log(err);
    })
    }
   

console.log();



//create do what it says function //
function dowhat() {
    fs.readFile("random.txt", "utf-8", function(err, data) {
         console.log(data);
         if (err) 
        console.log(err);
         
        var dataArr = data.split(",");
        console.log(dataArr); 
      
        var dataArr2 = dataArr[1].split(" ");
        console.log(dataArr2);
        go = dataArr[0];
        input = dataArr[1];
          // console.log(input);
          // console.log(command);
          spotify(dataArr);
          run();
          
      
          })
        }