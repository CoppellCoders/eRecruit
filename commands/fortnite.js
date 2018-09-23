const Discord = require("discord.js");
const Fortnite = require("fortnite");
const fetch = require('node-fetch')

const ftnApi = new Fortnite(process.env.fortnite_token);
const currentSeason = "5";

//.fbr <epic-username> [platform pc/psn/xbl]
//.fbr <epic-username> [platform pc/psn/xbl] {mode all/season}
//.fbr drop
module.exports.run = async (bot, message, args) => {
  //Fortnite drop command
  if (args[0].toLowerCase() == "drop") {
     
     
    let places = [
      "Lazy Links",
      "Dusty Divot",
      "Fatal Fields",
      "Flush Factory",
      "Greasy Grove",
      "Haunted Hills",
      "Junk Junction",
      "Lonely Lodge",
      "Loot Lake",
      "Lucky Landing",
      "Paradise Palms",
      "Pleasant Park",
      "Retail Row",
      "Risky Reels",
      "Salty Springs",
      "Shifty Shafts",
      "Snobby Shores",
      "Tilted Towers",
      "Tomato Town",
      "Wailing Woods"
    ];

    let picker = Math.floor(Math.random() * places.length); //Randomely picks a spot

    return message.channel.send(places[picker]); //Sends randomely picked spot
  }


  if (args[0].toLowerCase() == "leaderboard"||args[0].toLowerCase() == "lb") {
  var pcSolo = "https://api.partybus.gg/v1/leaderboards/pc/2/place_a";
  var xboxSolo = "https://api.partybus.gg/v1/leaderboards/xb1/2/place_a";
  var psSolo = "https://api.partybus.gg/v1/leaderboards/ps4/2/place_a";


  var pcDuo = "https://api.partybus.gg/v1/leaderboards/pc/10/place_a";
  var xboxDuo = "https://api.partybus.gg/v1/leaderboards/xb1/10/place_a";
  var psDuo = "https://api.partybus.gg/v1/leaderboards/ps4/10/place_a";


  var pcSquad = "https://api.partybus.gg/v1/leaderboards/pc/9/place_a";
  var xboxSquad = "https://api.partybus.gg/v1/leaderboards/xb1/9/place_a";
  var psSquad = "https://api.partybus.gg/v1/leaderboards/ps4/9/place_a";
console.log(args[2]);
  if(args[1]&&args[1].toLowerCase()=="pc"){

    if(args[2]&&args[2].toLowerCase()=="solo"){
        fetch(pcSolo)
	.then(function(res) {
		return res.json();
	}).then(function(json) {
var leaders="";
for(var x =0; x<25;x++){
    leaders+=(x+1)+") "+"**"+json[x].player.displayName + "** " + json[x].placeA+" Wins \n";

}

let lifeEmbed = new Discord.RichEmbed()
          .setTitle("FORTNITE PC SOLO LEADERBOARD")
          .setThumbnail(
            "https://fortnitestats.com/assets/img/img.jpg"
          )
          .setColor("#9869cd")
          .setDescription("\n"+leaders);
          //.addField(" ", leaders, true);

          message.channel.send(lifeEmbed);

   	});
    } else if(args[2]&&(args[2].toLowerCase()=="duo" || args[2].toLowerCase()=="duos" )){
        fetch(pcDuo)
        .then(function(res) {
            return res.json();
        }).then(function(json) {
    var leaders="";
    for(var x =0; x<25;x++){
        leaders+=(x+1)+") "+"**"+json[x].player.displayName + "** " + json[x].placeA+" Wins \n";
    
    }
    
    let lifeEmbed = new Discord.RichEmbed()
              .setTitle("FORTNITE PC SOLO LEADERBOARD")
              .setThumbnail(
                "https://fortnitestats.com/assets/img/img.jpg"
              )
              .setColor("#9869cd")
              .setDescription("\n"+leaders);
              //.addField(" ", leaders, true);
    
              message.channel.send(lifeEmbed);
    
           });
        
    }else{
        fetch(pcSquad)
        .then(function(res) {
            return res.json();
        }).then(function(json) {
    var leaders="";
    for(var x =0; x<25;x++){
        leaders+=(x+1)+") "+"**"+json[x].player.displayName + "** " + json[x].placeA+" Wins \n";
    
    }
    
    let lifeEmbed = new Discord.RichEmbed()
              .setTitle("FORTNITE PC SOLO LEADERBOARD")
              .setThumbnail(
                "https://fortnitestats.com/assets/img/img.jpg"
              )
              .setColor("#9869cd")
              .setDescription("\n"+leaders);
              //.addField(" ", leaders, true);
    
              message.channel.send(lifeEmbed);
    
           });
    }


  }else if(args[1]&&args[1].toLowerCase()=="xb1"){
    if(args[2]&&args[2].toLowerCase()=="solo"){
        fetch(xboxSolo)
	.then(function(res) {
		return res.json();
	}).then(function(json) {
var leaders="";
for(var x =0; x<25;x++){
    leaders+=(x+1)+") "+"**"+json[x].player.displayName + "** " + json[x].placeA+" Wins \n";

}

let lifeEmbed = new Discord.RichEmbed()
          .setTitle("FORTNITE XBOX ONE SOLO LEADERBOARD")
          .setThumbnail(
            "https://fortnitestats.com/assets/img/img.jpg"
          )
          .setColor("#9869cd")
          .setDescription("\n"+leaders);
          //.addField(" ", leaders, true);

          message.channel.send(lifeEmbed);

   	});
    } else if(args[2]&&(args[2].toLowerCase()=="duo" || args[2].toLowerCase()=="duos" )){
        fetch(xboxDuo)
        .then(function(res) {
            return res.json();
        }).then(function(json) {
    var leaders="";
    for(var x =0; x<25;x++){
        leaders+=(x+1)+") "+"**"+json[x].player.displayName + "** " + json[x].placeA+" Wins \n";
    
    }
    
    let lifeEmbed = new Discord.RichEmbed()
              .setTitle("FORTNITE XBOX ONE DUO LEADERBOARD")
              .setThumbnail(
                "https://fortnitestats.com/assets/img/img.jpg"
              )
              .setColor("#9869cd")
              .setDescription("\n"+leaders);
              //.addField(" ", leaders, true);
    
              message.channel.send(lifeEmbed);
    
           });
        
    }else{
        fetch(xboxSquad)
        .then(function(res) {
            return res.json();
        }).then(function(json) {
    var leaders="";
    for(var x =0; x<25;x++){
        leaders+=(x+1)+") "+"**"+json[x].player.displayName + "** " + json[x].placeA+" Wins \n";
    
    }
    
    let lifeEmbed = new Discord.RichEmbed()
              .setTitle("FORTNITE XBOX ONE SQUAD LEADERBOARD")
              .setThumbnail(
                "https://fortnitestats.com/assets/img/img.jpg"
              )
              .setColor("#9869cd")
              .setDescription("\n"+leaders);
              //.addField(" ", leaders, true);
    
              message.channel.send(lifeEmbed);
    
           });
    }
      
}else if(args[1]&&args[1].toLowerCase()=="ps4"){
    if(args[2]&&args[2].toLowerCase()=="solo"){
        fetch(psSolo)
	.then(function(res) {
		return res.json();
	}).then(function(json) {
var leaders="";
for(var x =0; x<25;x++){
    leaders+=(x+1)+") "+"**"+json[x].player.displayName + "** " + json[x].placeA+" Wins \n";

}

let lifeEmbed = new Discord.RichEmbed()
          .setTitle("FORTNITE PS4 SOLO LEADERBOARD")
          .setThumbnail(
            "https://fortnitestats.com/assets/img/img.jpg"
          )
          .setColor("#9869cd")
          .setDescription("\n"+leaders);
          //.addField(" ", leaders, true);

          message.channel.send(lifeEmbed);

   	});
    } else if(args[2]&&(args[2].toLowerCase()=="duo" || args[2].toLowerCase()=="duos") ){
        fetch(psDuo)
        .then(function(res) {
            return res.json();
        }).then(function(json) {
    var leaders="";
    for(var x =0; x<25;x++){
        leaders+=(x+1)+") "+"**"+json[x].player.displayName + "** " + json[x].placeA+" Wins \n";
    
    }
    
    let lifeEmbed = new Discord.RichEmbed()
              .setTitle("FORTNITE PS4 DUO LEADERBOARD")
              .setThumbnail(
                "https://fortnitestats.com/assets/img/img.jpg"
              )
              .setColor("#9869cd")
              .setDescription("\n"+leaders);
              //.addField(" ", leaders, true);
    
              message.channel.send(lifeEmbed);
    
           });
        
    }else{
        fetch(psSquad)
        .then(function(res) {
            return res.json();
        }).then(function(json) {
    var leaders="";
    for(var x =0; x<25;x++){
        leaders+=(x+1)+") "+"**"+json[x].player.displayName + "** " + json[x].placeA+" Wins \n";
    
    }
    
    let lifeEmbed = new Discord.RichEmbed()
              .setTitle("FORTNITE PS4 SQUAD LEADERBOARD")
              .setThumbnail(
                "https://fortnitestats.com/assets/img/img.jpg"
              )
              .setColor("#9869cd")
              .setDescription("\n"+leaders);
              //.addField(" ", leaders, true);
    
              message.channel.send(lifeEmbed);
    
           });
    }
}else{
   message.channel.send(
        "Platform not provided. Use the right syntax: `.fbr lb [platform pc/xbl/psn] {solo,duo,squad}`."
      );


}
     
return;
  }


  if (args[0].toLowerCase() == "shop") {
  
    fetch('https://www.stormshield.one/v2/api.json')
	.then(function(res) {
		return res.json();
	}).then(function(json) {
        var weekly = json.pvp_sales.weekly;
        var daily = json.pvp_sales.daily;
var shopItems = new Array();
var shopPrice = new Array();
var shopPath = new Array();
var color = new Array();
        for (var i = 0; i < json.pvp_sales.weekly.length; i++) { 
            shopItems.push(json.pvp_sales.weekly[i].title);
            shopPath.push(json.pvp_sales.weekly[i].path);
            shopPrice.push(json.pvp_sales.weekly[i].final_price);
            var price = json.pvp_sales.weekly[i].final_price;
            var word = json.pvp_sales.weekly[i].path;
            if (word.includes("Soldier")) {
                if(price==2000){
                    color.push("#c47145");

                }else if(price==1500){
                    color.push("#9869cd");

                }else if(price==1200){
                    color.push("#6091d2");

                }else if(price==800){

                    color.push("#538b4b");
                }


            } else if (word.includes("Glider")) {

                if(price==2000){
                    color.push("#c47145");

                }else if(price==1500||price==1200){
                    color.push("#9869cd");

                }else if(price==800){
                    color.push("#6091d2");

                }else if(price==500){

                    color.push("#538b4b");
                }


            } else if (word.includes("Emote")) {
                if(price==800){
                    color.push("#9869cd");

                }else if(price==500){
                    color.push("#6091d2");

                }else if(price==200){

                   
                    color.push("#538b4b");
                }

            }else if (word.includes("Pickaxe")) {
                if(price==1500|price==1200){
                    color.push("#9869cd");

                }else if(price==800){
                    color.push("#6091d2");

                }else if(price==500){

                    color.push("#538b4b");
                }
            }
        }

        for (var i = 0; i < json.pvp_sales.daily.length; i++) { 
            shopItems.push(json.pvp_sales.daily[i].title);
            shopPath.push(json.pvp_sales.daily[i].path);
            shopPrice.push(json.pvp_sales.daily[i].final_price);
        
            if (word.includes("Soldier")) {
                if(price==2000){
                    color.push("#c47145");

                }else if(price==1500){
                    color.push("#9869cd");

                }else if(price==1200){
                    color.push("#6091d2");

                }else if(price==800){

                    color.push("#538b4b");
                }


            } else if (word.includes("Glider")) {

                if(price==2000){
                    color.push("#c47145");

                }else if(price==1500||price==1200){
                    color.push("#9869cd");

                }else if(price==800){
                    color.push("#6091d2");

                }else if(price==500){

                    color.push("#538b4b");
                }


            } else if (word.includes("Emote")) {
                if(price==800){
                    color.push("#9869cd");

                }else if(price==500){
                    color.push("#6091d2");

                }else if(price==200){

                   
                    color.push("#538b4b");
                }

            }else if (word.includes("Pickaxe")) {
                if(price==1500|price==1200){
                    color.push("#9869cd");

                }else if(price==800){
                    color.push("#6091d2");

                }else if(price==500){

                    color.push("#538b4b");
                }
            }
        }


        for(var x=0; x<shopItems.length;x++){
            let lifeEmbed = new Discord.RichEmbed()
            .setTitle("FORTNITE SHOP")
            .setThumbnail(
              "https://i.gyazo.com/c94f9e5e20cc24dae28839a3bdb3c55d.png"
            )
            .setDescription(shopItems[x] + " " +  shopPrice[x] + " <:vbucks:493185469383704596>")
            .setColor(color[x])
        .setImage(shopPath[x])
            .addBlankField();
  
          message.channel.send(lifeEmbed); //Sends lifetime stats


        }

     

	});
    


  //  return message.channel.send(places[picker]); //Sends randomely picked spot
  }
  //Fortnite stats
  let username = args[0]; //Gets username
  let platform = "pc";
  let mode = "life"; //Default stats: lifetime
/*
  if (args[2]) {
    if (args[2].toLowerCase() == "all" || args[2].toLowerCase() == "season") {
      mode = args[2]; //Gets stats type, all or season stats
    } else {
      return message.channel.send(
        "Error. Use the right syntax: `.fbr <epic-username> [platform pc/xbl/psn] {mode all/season}`.\nFor lifetime stats use `.fbr <epic-username> [platform pc/xbl/psn]`"
      ); //Sends error message
    }
  }
*/

  if(args[1]=="pc"||args[1]=="xb1"||args[1]=="ps4"){
    platform = args[1]
    if(args[2]){
        mode = args[2];
    }
}else if(args[1]=="solo"||args[1]=="squad"||args[1]=="duo"||args[1]=="squads"||args[1]=="duos"){
      mode = args[1]
  }
  
  if (!username)
    //No username specified?
    return message.channel.send(
      "Username not provided. Use the right syntax: `.fbr <epic-username> [platform pc/xbl/psn] {mode all/season}`.\nFor lifetime stats use `.fbr <epic-username> [platform pc/xbl/psn]`"
    ); //Sends error message

    
   
 

    

    






  let data = ftnApi
    .user(username, platform)
    .then(data => {
      let stats = data.stats; //Raw stats
      if (mode == "life") {
        let lifetime = stats.lifetime; //Lifetime stats
        let lifeScore = lifetime[6]["Score"];
        let lifeMatches = lifetime[7]["Matches Played"];
        let lifeWins = lifetime[8]["Wins"];
        let lifeWinPercent = lifetime[9]["Win%"];
        let lifeKills = lifetime[10]["Kills"];
        let lifeKd = lifetime[11]["K/d"];

        let lifeEmbed = new Discord.RichEmbed()
          .setTitle("FORTNITE LIFETIME STATS")
          .setThumbnail(
            "https://i.gyazo.com/bf61b9b159a69da22b900a7eb15bf96e.png"
          )
          .setDescription(`Lifetime stats for ${data.username}`)
          .setColor("#42b6f4")
          .addField("Wins", lifeWins, true)
          .addField("Kills", lifeKills, true)
          .addField("K/D", lifeKd, true)
          .addField("Matches Played", lifeMatches, true)
          .addField("Score", lifeScore, true)
          .addField("Win Percentage", lifeWinPercent, true);

        message.channel.send(lifeEmbed); //Sends lifetime stats
      }else if (mode.toLowerCase() == "solo") {
          console.log("IM RUNNING");
        //Solo stats
        let solo = stats.solo;
        let soloScore = solo.score;
        let soloMatches = solo.matches;
        let soloWins = solo.wins;
        let soloKills = solo.kills;
        let soloKd = solo.kd;

        let soloEmbed = new Discord.RichEmbed()
          .setTitle("FORTNITE SOLO STATS")
          .setThumbnail("https://i.gyazo.com/6f68a53e8330c0233a0cee84da1679b6.png")
          .setDescription(`Solo stats for ${data.username}`)
          .setColor("#42b6f4")
          .addField("Wins", soloWins, true)
          .addField("Kills", soloKills, true)
          .addField("K/D", soloKd, true)
          .addField("Matches Played", soloMatches, true)
          .addField("Score", soloScore, true);
      return message.channel.send(soloEmbed); //Send solo stats
      }else if (mode.toLowerCase() == "duo"||mode.toLowerCase() == "duos") {
        //Duo stats
        let duo = stats.duo;
        let duoScore = duo.score;
        let duoMatches = duo.matches;
        let duoWins = duo.wins;
        let duoKills = duo.kills;
        let duoKd = duo.kd;

        let duoEmbed = new Discord.RichEmbed()
          .setTitle("FORTNITE DUO STATS")
          .setThumbnail(
            "https://i.gyazo.com/88e9a11710991e409be7a568c30b184e.png"
          )
          .setDescription(`Duo stats for ${data.username}`)
          .setColor("#42b6f4")
          .addField("Wins", duoWins, true)
          .addField("Kills", duoKills, true)
          .addField("K/D", duoKd, true)
          .addField("Matches Played", duoMatches, true)
          .addField("Score", duoScore, true);
        message.channel.send(duoEmbed); //Send duo stats
          } else if (mode.toLowerCase() == "squad"||mode.toLowerCase() == "squads") {
        //Squad stats
        let squad = stats.squad;
        let squadScore = squad.score;
        let squadMatches = squad.matches;
        let squadWins = squad.wins;
        let squadKills = squad.kills;
        let squadKd = squad.kd;

        let squadEmbed = new Discord.RichEmbed()
          .setTitle("FORTNITE SQUAD STATS")
          .setThumbnail(
            "https://i.gyazo.com/0a2f132347a6593f9f584ad1a7fed02f.png"
          )
          .setDescription(`Squad stats for ${data.username}`)
          .setColor("#42b6f4")
          .addField("Wins", squadWins, true)
          .addField("Kills", squadKills, true)
          .addField("K/D", squadKd, true)
          .addField("Matches Played", squadMatches, true)
          .addField("Score", squadScore, true);
        message.channel.send(squadEmbed); //Send squad stats
      } else if (mode.toLowerCase() == "season") {
        //Solo season stats
        let currentSolo = stats.current_solo;
        let currentSoloScore = currentSolo.score;
        let currentSoloMatches = currentSolo.matches;
        let currentSoloWins = currentSolo.wins;
        let currentSoloKills = currentSolo.kills;
        let currentSoloKd = currentSolo.kd;

        let currentSoloEmbed = new Discord.RichEmbed()
          .setTitle(`FORTNITE SEASON ${currentSeason} SOLO STATS`)
          .setThumbnail("https://i.gyazo.com/6f68a53e8330c0233a0cee84da1679b6.png")
          .setDescription(
            `Season ${currentSeason} Solo stats for ${data.username}`
          )
          .setColor("#42b6f4")
          .addField("Wins", currentSoloWins, true)
          .addField("Kills", currentSoloKills, true)
          .addField("K/D", currentSoloKd, true)
          .addField("Matches Played", currentSoloMatches, true)
          .addField("Score", currentSoloScore, true).addBlankField();
        message.channel.send(currentSoloEmbed); //Send solo season stats

        //Duo season stats
        let currentDuo = stats.current_duo;
        let currentDuoScore = currentDuo.score;
        let currentDuoMatches = currentDuo.matches;
        let currentDuoWins = currentDuo.wins;
        let currentDuoKills = currentDuo.kills;
        let currentDuoKd = currentDuo.kd;

        let currentDuoEmbed = new Discord.RichEmbed()
          .setTitle(`FORTNITE SEASON ${currentSeason} DUO STATS`)
          .setThumbnail(
            "https://i.gyazo.com/88e9a11710991e409be7a568c30b184e.png"
          )
          .setDescription(
            `Season ${currentSeason} Duo stats for ${data.username}`
          )
          .setColor("#42b6f4")
          .addField("Wins", currentDuoWins, true)
          .addField("Kills", currentDuoKills, true)
          .addField("K/D", currentDuoKd, true)
          .addField("Matches Played", currentDuoMatches, true)
          .addField("Score", currentDuoScore, true)
          .addBlankField();
        message.channel.send(currentDuoEmbed); //Send duo season stats

        //Squad season stats
        let currentSquad = stats.current_duo;
        let currentSquadScore = currentSquad.score;
        let currentSquadMatches = currentSquad.matches;
        let currentSquadWins = currentSquad.wins;
        let currentSquadKills = currentSquad.kills;
        let currentSquadKd = currentSquad.kd;

        let currentSquadEmbed = new Discord.RichEmbed()
          .setTitle(`FORTNITE SEASON ${currentSeason} SQUAD STATS`)
          .setThumbnail(
            "https://i.gyazo.com/0a2f132347a6593f9f584ad1a7fed02f.png"
          )
          .setDescription(
            `Season ${currentSeason} Squad stats for ${data.username}`
          )
          .setColor("#42b6f4")
          .addField("Wins", currentSquadWins, true)
          .addField("Kills", currentSquadKills, true)
          .addField("K/D", currentSquadKd, true)
          .addField("Matches Played", currentSquadMatches, true)
          .addField("Score", currentSquadScore, true)
          .addBlankField();
        message.channel.send(currentSquadEmbed); //Send squad stats
      }
    })
    .catch(e => {
      //Error handling
      //console.log(e);
      return message.channel.send(
        "Error. User not found, make sure you are using the right syntax: `.fbr <epic-username> [platform pc/xbl/psn] {mode all/season}`.\nFor lifetime stats use `.fbr <epic-username> [platform pc/xbl/psn]`\n\n**If this problem keeps arising, make sure you use the `.issue` command to report any issues with the bot**"
      ); //Send error message
    });
};

module.exports.help = {
  name: "fn"
};