
const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run=async(bot, message, args) =>{
    //Checks if Username is provided
    if(!args[0]){
        return message.channel.send("Error. Please specify a username for PUBG `.pubg <username> `");
    }
    let username =args[0];
    let result = checkUsername(username); //Checks if username is a valid PUBG username


   if(!args[2]){
       let profileStats= await getProfileStats(username); //Gets basic stats
       let playerStats=await getPlayerStats(username); //Get more detailed stats

       let embed= new Discord.RichEmbed().setTitle(`##PUBG STATS FOR ${profileStats.username.toUpperCase()}##`);

       return message.channel.send(embed);
   }
}

module.exports.help = {
    name: "pubg"
  };
  