const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run=async(bot, message, args) =>{
    //Checks if Username is provided
    if(!args[0]){
        return message.channel.send("Error. Please specify a username for PUBG `.pubg <username> `");
    }
    let username =args[0];
    
    //If the input is '.pubg season or .pubg seasons
    if(args[0].toUpperCase()=="seasons".toUpperCase()&&!args[1]){
    console.log("SEASONS");   
    let embed=new Discord.RichEmbed().setTitle("**PUBG SEASONS LIST**");
        let seasons= await getSeasons(true);
        console.log(seasons.length);

        //Add all the seasons to the rich embed side by side
        for (let index = 0; index < seasons.length; index++) {
            embed.addField(seasons[index],"TEST",true); 
        }
        embed.setThumbnail("https://pngimg.com/uploads/pubg/pubg_PNG57.png");
        return message.channel.send(embed);
    }

    //if the input is .pubg seasons <username>
    else if(args[0].toUpperCase()=="seasons".toUpperCase()&&args[1]){
        let id =await getIDfromUsername(args[1]);
        let seasons= await getSeasons(false);
        let seasonsStats=new Array();
        let embed= new Discord.RichEmbed();

        //Sets the player stats for every season to seasons of that index
        for (let index = 0; index < seasons.length&& index<5; index++) {
            let stats= await getPlayerSeasonStats(id,seasons[index]);
            embed=new Discord.RichEmbed();
            embed.setTitle(`PUBG STATS FOR ${args[1]} FOR ${seasons[index]}`);
            embed.setThumbnail("https://pngimg.com/uploads/pubg/pubg_PNG57.png");
            embed.addField("Duos (FPP) Assists",stats.duo_fpp.assists,true);
            //embed.addField("Duos (FPP) Boosts",stats.duo_fpp.boosts,true);
            //embed.addField("Duos (FPP) dBNOs",stats.duo_fpp.dBNOs,true);
            embed.addField("Duos (FPP) Daily Kills",stats.duo_fpp.dailyKills,true);
            embed.addField("Duos (FPP) Damage Dealt",stats.duo_fpp.damageDealt,true);
            //embed.addField("Duos (FPP) Days",stats.duo_fpp.days,true);
            embed.addField("Duos (FPP) Headshot Kills",stats.duo_fpp.headshotKills,true);
            embed.addField("Duos (FPP) Heals",stats.duo_fpp.heals,true);
            embed.addField("Duos (FPP) Kill Points",stats.duo_fpp.killPoints,true);
            embed.addField("Duos (FPP) Kills",stats.duo_fpp.kills,true);
            embed.addField("Duos (FPP) Longest Kill",stats.duo_fpp.longestKill,true);
            embed.addField("Duos (FPP) Longest Time Survived",stats.duo_fpp.longestTimeSurvived,true);
            embed.addField("Duos (FPP) Losses",stats.duo_fpp.losses,true);
            embed.addField("Duos (FPP) Max Kill Streaks",stats.duo_fpp.maxKillStreaks,true);
            embed.addField("Duos (FPP) Most Survival Time",stats.duo_fpp.mostSurvivalTime,true);
            embed.addField("Duos (FPP) Revives",stats.duo_fpp.revives,true);
            //embed.addField("Duos (FPP) Ride Distance",stats.duo_fpp.rideDistance,true);
            embed.addField("Duos (FPP) Road Kills",stats.duo_fpp.roadKills,true);
            embed.addField("Duos (FPP) Round Most Kills",stats.duo_fpp.roundMostKills,true);
            embed.addField("Duos (FPP) Rounds Played",stats.duo_fpp.roundsPlayed,true);
            embed.addField("Duos (FPP) Suicides",stats.duo_fpp.suicides,true);
            embed.addField("Duos (FPP) Team Kills",stats.duo_fpp.teamKills,true);
            embed.addField("Duos (FPP) Time Survived",stats.duo_fpp.timeSurvived,true);
            embed.addField("Duos (FPP) Top 10s",stats.duo_fpp.top10s,true);
            //embed.addField("Duos (FPP) Vehicles Destroyed",stats.duo_fpp.vehicleDestroys,true);
            //embed.addField("Duos (FPP) Walk Distance",stats.duo_fpp.walkDistance,true);
            embed.addField("Duos (FPP) Weapons Aquired",stats.duo_fpp.weaponsAcquired,true);
            embed.addField("Duos (FPP) Weekly Kills",stats.duo_fpp.weeklyKills,true);
            embed.addField("Duos (FPP) Win Points",stats.duo_fpp.winPoints,true);
            embed.addField("Duos (FPP) Wins",stats.duo_fpp.wins,true);
            message.channel.send(embed);
            embed=new Discord.RichEmbed();
            embed.setTitle(`PUBG STATS FOR ${args[1]} FOR ${seasons[index]}`);
            embed.setThumbnail("https://pngimg.com/uploads/pubg/pubg_PNG57.png");
            embed.addField("Solos (FPP) Assists",stats.solo_fpp.assists,true);
            //embed.addField("Solos (FPP) Boosts",stats.solo_fpp.boosts,true);
            //embed.addField("Solos (FPP) dBNOs",stats.solo_fpp.dBNOs,true);
            embed.addField("Solos (FPP) Daily Kills",stats.solo_fpp.dailyKills,true);
            embed.addField("Solos (FPP) Damage Dealt",stats.solo_fpp.damageDealt,true);
            //embed.addField("Solos (FPP) Days",stats.solo_fpp.days,true);
            embed.addField("Solos (FPP) Headshot Kills",stats.solo_fpp.headshotKills,true);
            embed.addField("Solos (FPP) Heals",stats.solo_fpp.heals,true);
            embed.addField("Solos (FPP) Kill Points",stats.solo_fpp.killPoints,true);
            embed.addField("Solos (FPP) Kills",stats.solo_fpp.kills,true);
            embed.addField("Solos (FPP) Longest Kill",stats.solo_fpp.longestKill,true);
            embed.addField("Solos (FPP) Longest Time Survived",stats.solo_fpp.longestTimeSurvived,true);
            embed.addField("Solos (FPP) Losses",stats.solo_fpp.losses,true);
            embed.addField("Solos (FPP) Max Kill Streaks",stats.solo_fpp.maxKillStreaks,true);
            embed.addField("Solos (FPP) Most Survival Time",stats.solo_fpp.mostSurvivalTime,true);
            embed.addField("Solos (FPP) Revives",stats.solo_fpp.revives,true);
            //embed.addField("Solos (FPP) Ride Distance",stats.solo_fpp.rideDistance,true);
            embed.addField("Solos (FPP) Road Kills",stats.solo_fpp.roadKills,true);
            embed.addField("Solos (FPP) Round Most Kills",stats.solo_fpp.roundMostKills,true);
            embed.addField("Solos (FPP) Rounds Played",stats.solo_fpp.roundsPlayed,true);
            embed.addField("Solos (FPP) Suicides",stats.solo_fpp.suicides,true);
            embed.addField("Solos (FPP) Team Kills",stats.solo_fpp.teamKills,true);
            embed.addField("Solos (FPP) Time Survived",stats.solo_fpp.timeSurvived,true);
            embed.addField("Solos (FPP) Top 10s",stats.solo_fpp.top10s,true);
            //embed.addField("Solos (FPP) Vehicles Destroyed",stats.solo_fpp.vehicleDestroys,true);
            //embed.addField("Solos (FPP) Walk Distance",stats.solo_fpp.walkDistance,true);
            embed.addField("Solos (FPP) Weapons Aquired",stats.solo_fpp.weaponsAcquired,true);
            embed.addField("Solos (FPP) Weekly Kills",stats.solo_fpp.weeklyKills,true);
            embed.addField("Solos (FPP) Win Points",stats.solo_fpp.winPoints,true);
            embed.addField("Solos (FPP) Wins",stats.solo_fpp.wins,true);
            message.channel.send(embed);
            
        }
        
        embed.setThumbnail("https://pngimg.com/uploads/pubg/pubg_PNG57.png");
        return message.channel.send(embed);
    }

    //If the input is .pubg <username>
    else if(!args[2]){
        console.log("PLAYER STATS");
        let profileStats= await getProfileStats(username); //Gets basic stats

        console.log(profileStats);

        let embed= new Discord.RichEmbed().setTitle(`**PUBG STATS FOR ${profileStats.name.toUpperCase()}**`);

        return message.channel.send(embed);
    }

   //Gets stats of a profile with provided Username
   async function getProfileStats(username) {
        //Accesses the API 
        let {body} = await superagent
            .get(`https://api.pubg.com/shards/pc-na/players?filter[playerNames]=${username}`)
            .set("Authorization", process.env.pubg_key)
            .set("accept", "application/vnd.api+json")
            .on("error", err=>{
                return message.channel.send(
                    "Error occurred while retrieving player stats. Please try again later.\n\n **If this problem keeps arising, make sure you use the `.issue` command to report any issues with the bot**"
                );
            });

        //API error Handling
        if(Object.keys(body).length===0){
            return message.channel.send(
                "Error occurred while retrieving player stats. Please try again later"
            );
            
        }

        //Get needed data
        let stats = body.data;
        let id = stats[0].id;
        let playerName=stats[0].attributes.name;
        return{
            name: playerName, 
            id: id   
        };
    }

    //Gets the PUBG seasons and returns them with newest first, reverse Sorted.
   async function getSeasons(pretty){
        let {body} = await superagent
            .get(`https://api.pubg.com/shards/pc-na/seasons`)
            .set("Authorization", process.env.pubg_key)
            .set("accept", "application/vnd.api+json")
            .on("error", err=>{
                return message.channel.send(
                    "Error occurred while retrieving season stats. Please try again later.\n\n **If this problem keeps arising, make sure you use the `.issue` command to report any issues with the bot**"
                );
            });

        let data =body.data;
        
        let seasonsNames =new Array();
        for (let index = 0; index < data.length; index++) {
            
            seasonsNames.push(body.data[index].id);
        }

      
        seasonsNames.reverse();

        if(pretty){
            seasonsNames.forEach(function(element,index ) {
                seasonsNames[index]= element.substring(element.lastIndexOf(".")+1);     
            });
        }
        
        console.log(seasonsNames);
        return seasonsNames;
   }

   async function getIDfromUsername(playerUsername){
        //Request the Info from the API
        let {body} = await superagent
        .get(`https://api.pubg.com/shards/pc-na/players?filter[playerNames]=${playerUsername}`)
        .set("Authorization", process.env.pubg_key)
        .set("accept", "application/vnd.api+json")
        .on("error", err=>{
            return message.channel.send(
                "Error occurred while retrieving playerID. Please try again later.\n\n **If this problem keeps arising, make sure you use the `.issue` command to report any issues with the bot**"
            );
        });

        //API error Handling
        if(Object.keys(body).length===0){
            return message.channel.send(
                "Error occurred while retrieving playerID. Please try again later"
            );
            
        }
        //Get ID out of the data and return it
        let stats = body.data;
        let id = stats[0].id;
        return id;
   }

   async function getPlayerSeasonStats(playerID,seasonID){
        let {body}= await superagent
        .get(`https://api.pubg.com/shards/pc-na/players/${playerID}/seasons/${seasonID}`)
        .set("Authorization", process.env.pubg_key)
        .set("accept", "application/vnd.api+json")
        .on("error", err=>{
            return message.channel.send(
                "Error occurred while retrieving player stats for a season. Please try again later.\n\n **If this problem keeps arising, make sure you use the `.issue` command to report any issues with the bot**"
            );
        });

        let data=body.data.attributes.gameModeStats;
        let duo=data.duo;
        let duo_fpp=data["duo-fpp"];
        let solo=data.solo;
        let solo_fpp=data["solo-fpp"];
        let squad=data.squad;
        let squad_fpp=data["squad-fpp"];
        

        return {
            body: body,
            duo: duo,
            duo_fpp: duo_fpp,
            solo: solo,
            solo_fpp: solo_fpp,
            squad: squad,
            squad_fpp: squad_fpp
        };

   }
}
   
module.exports.help = {
    name: "pubg"
  };
  