function Player(name, position, offense, defense){
  this.name = name;
  this.position = position;
  this.offense = offense;
  this.defense = defense;

Add CommentClick to expand inline (37 lines)
Today

slackbot9:55 AM
Reminder: Sign into Bootcampspot and mark yourselves present! :slightly_smiling_face:
new messages

Franklin10:30 AM
added this JavaScript/JSON snippet: Untitled 
var count = 0;
var players = [];

var addPlayers = function(){
  if(count < 3){
    inquirer.prompt(
      [
        {
          type: "text",
          message: "Enter the player's name:",
          name: "name"
        },
        {
          type: "text",
          message: "Enter the player's position:",
          name: "position"
        },
        {
          type: "text",
          message: "Enter the player's offensive rating:",
          name: "offense"
        },
        {
          type: "text",
          message: "Enter the player's defensive rating:",
          name: "defense"
        },
      ]
    ).then(function(player) {
      //create a new player
      console.log("New Player: ", player, "****************\n\n")
      var player1 = new Player(player.name, player.position, player.offense, player.defense);

      players.push(player1);

      count++;

      addPlayers();
    });
  }
  else{
    for(var i = 0; i < players.length; i++){
      players[i].printStats();
    }
  }
}

addPlayers();