var fs = require("fs");
var keys = require("./keys.js");


// Twitter
var Twitter = require('twitter');
var client = new Twitter(keys.twitterKeys);
var params = {screen_name: 'Nexxynex'};


//Spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: "fa5faa740eae4923b4be98ff983d124b",
  secret: "016e730624eb43e787157c38bb0b77c1"
});
var songTitle = "";


//OMDB
var request = require("request");
var movieName = "";


var randomArray = []; 


//node
var command = process.argv[2];
var nodeArgs = process.argv;


function runSwitch(){

  switch (command) {
  	case "my-tweets":
  		twitter();
  		break;

  	case "spotify-this-song":
  		spot();
  		break;

  	case "movie-this":
  		movie();
  		break;

  	case "do-what-it-says":
  		doWhat();
  		break;

    default:
      console.log("Plese use one of the following commands: my-tweets, spotify-this-song, movie-this, do-what-it-says.") 
      break;

  }

}

runSwitch();


function twitter() {

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  };
  	for (var i = 0; i < tweets.length; i++) {
        console.log("----------------------------------");
		    console.log("Tweet: " + tweets[i].text);
		    console.log("Created: " + tweets[i].created_at);
        console.log("----------------------------------");

        fs.appendFile("log.txt", 
          "\n" +   
          "----------------------------------\n" + 
          "Tweet: " + tweets[i].text + "\n" +
          "Created: " + tweets[i].created_at + "\n" +
          "----------------------------------\n",
        function(err) {
          if (err) {
            console.log(err);
          }

        });


	}
});

}

function spot(){

  if (!nodeArgs[3]) {

    songTitle = "the sign ace of base";
    spotifySearch();

  }

  else {

    var sep = "";
    for (var i = 3; i < nodeArgs.length; i++) {
      
      songTitle += sep + nodeArgs[i];
      sep = " ";

    }
    spotifySearch();

  }
	

} 

function movie(){

  if (!nodeArgs[3]) {

    movieName = "Mr.Nobody";
    movieSearch();

  }

  else{

  	for (var i = 3; i < nodeArgs.length; i++) {

      if (i > 3 && i < nodeArgs.length) {

      movieName = movieName + "+" + nodeArgs[i];

      }

      else {

      movieName += nodeArgs[i];

      }
    }

    movieSearch();

  }


}



function doWhat(){

	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err){
			console.log(err);
		}

		randomArray = data.split(",")
    command = randomArray[0];
    process.argv[3] = randomArray[1];

  runSwitch();


	}); 



}


function spotifySearch(){

  spotify.search({ type: 'track', query: songTitle }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  console.log("----------------------------------");
  console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name);  // artist name
  console.log("Track Name: " + data.tracks.items[0].name); // name of track
  if(data.tracks.items[0].preview_url){
    console.log("Preview URL: " + data.tracks.items[0].preview_url); // preview url
  } 
  else {
    console.log("Preview URL: Not Available"); 
  }   
  console.log("Album Name: " + data.tracks.items[0].album.name);
  console.log("----------------------------------");

  // append to log.txt
  fs.appendFile("log.txt", 
  "\n" +   
  "----------------------------------\n" + 
  "Artist Name: " + data.tracks.items[0].album.artists[0].name + "\n" +
  "Track Name: " + data.tracks.items[0].name + "\n" +
  "Preview URL: " + data.tracks.items[0].preview_url + "\n" +
  "Album Name: " + data.tracks.items[0].album.name + "\n" +
  "----------------------------------\n",

  function(err) {

  if (err) {
    console.log(err);
  }

  });


  }); 

}


function movieSearch(){

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=e37eb9ac";

  
  request(queryUrl, function(error, response, body) {

    if (!error && response.statusCode === 200) {

      console.log("----------------------------------");
      console.log("Movie Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Produced In: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("Movie Website: " + JSON.parse(body).Website);
      console.log("----------------------------------");

      fs.appendFile("log.txt", 
      "\n" +   
      "----------------------------------\n" + 
      "Movie Title: " + JSON.parse(body).Title + "\n" +
      "Release Year: " + JSON.parse(body).Year + "\n" +
      "IMDB Rating: " + JSON.parse(body).imdbRating + "\n" +
      "Produced In: " + JSON.parse(body).Country + "\n" +
      "Language: " + JSON.parse(body).Language + "\n" +
      "Plot: " + JSON.parse(body).Plot + "\n" +
      "Actors: " + JSON.parse(body).Actors + "\n" +
      "Movie Website: " + JSON.parse(body).Website + "\n" +
      "----------------------------------\n",

      function(err) {

        if (err) {
          console.log(err);
        }
      });
    } 

  });  

}



