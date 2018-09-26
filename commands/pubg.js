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
        let embed= new Discord.RichEmbed().setTitle(`PUBG SEASONS FOR ${args[1]}`);

        //Sets the player stats for every season to seasons of that index
        //for (let index = 0; index < seasons.length&& index<8; index++) {
          //  seasonsStats.push(await getPlayerSeasonStats(id,seasons[index]));
          //  console.log(seasons[index]); 
        //}
        let test=await getPlayerSeasonStats(id,seasons[0]);
        console.log(test);
        embed.addField("Kills for some season",test.solo_fpp.kills);
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
        let duos=data.duo;
        let duo_fpp=data["duo-fpp"];
        let solo=data.solo;
        let solo_fpp=data["solo-fpp"];
        let squad=data.squad;
        let squad_fpp=data["squad-fpp"];
        

        return {
            body: body,
            duos: duos,
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
  