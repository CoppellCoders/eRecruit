
const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run=async(bot, message, args) =>{
    //Checks if Username is provided
    if(!args[0]){
        return message.channel.send("Error. Please specify a username for PUBG `.pubg <username> `");
    }
    let username =args[0];
    //let result = checkUsername(username); //Checks if username is a valid PUBG username


   if(!args[2]){
       let profileStats= await getProfileStats(username); //Gets basic stats
      // let playerStats=await getPlayerStats(username); //Get more detailed stats

       let embed= new Discord.RichEmbed().setTitle(`##PUBG STATS FOR ${profileStats.playername.toUpperCase()}##`);

       return message.channel.send(embed);
   }
   async function getProfileStats(username) {
    //Accessses the API 
    let {body} = await superagent
        .get(`https://api.pubg.com/shards/pc-na/players?filter[playerNames]=${username}`)
        .set("Authorization", process.env.pubg_key)
        .set("accept", "application/vnd.api+json")
        .on("error", err=>{
            return message.channel.send(
                "Error occured while retrieving player stats. Please try again later.\n\n **If this problem keeps arising, make sure you use the `!issue` command to report any issues with the bot**"
            );
        });
    console.log(body);
    //API error Handling
        if(Object.keys(body).length===0){
            return message.channel.send(
                "Error occured while retrieving player stats. Please try again later"
            );
            return body;
        }
   }

   let stats = body.data;
   let id = stats.id;
   let playername=stats.attributes.name;
   return{
    playername,id   
    };
}

module.exports.help = {
    name: "pubg"
  };
  