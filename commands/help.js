const Discord = require("discord.js");

//help
module.exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
  .setTitle("**Fortnite**")
  .addField("To get leaderboard ","`.fn lb [platform pc/xbl/psn] {solo,duo,squad}`")
  .addField("To get an individual profile stats","`.fn <epic-username> [platform pc/xbl/psn] {mode all/season}`")
  .addField("To get a drop location","`.fn drop`")
  .setColor("#9400D3")
  .setThumbnail("https://vignette.wikia.nocookie.net/fortnite/images/6/61/Battle_Royale_logo.png/revision/latest/scale-to-width-down/480?cb=20180313000428")
  message.channel.send(embed);
  embed = new Discord.RichEmbed()
  .setTitle("**Overwatch**")
  .addField("To get an individual profile stats","`.ow <username#battleTag> [platform pc/psn/xbl]`")
  .addField("To get a profile's top heroes ","`.ow <username#battleTag> [platform pc/psn/xbl] top/heroes`")
  .setColor("#FA9C1E")
  .setThumbnail("http://www.stickpng.com/assets/images/586273b931349e0568ad89df.png")
  message.channel.send(embed);
  embed = new Discord.RichEmbed()
  .setTitle("**League of Legends**")
  .addField("To get an individual profile stats","`.lol <region> <playername>`")
  .setColor("#B49236")
  .setThumbnail("https://i.imgur.com/vgERB5I.png")
  message.channel.send(embed);
  embed = new Discord.RichEmbed()
  .setTitle("**Counter Strike: Global Offensive**")
  .addField("To get an individual profile stats","`.csgo <steamCommunityID>`")
  .setColor("#B49236")
  .setThumbnail("https://i.redd.it/1s0j5e4fhws01.png")
  message.channel.send(embed);
  embed = new Discord.RichEmbed()
  .setTitle("**PROFILES**")
  .addField("To create a player profile","`.profile create player`")
  .addField("To create a recruiter profile","`.profile create recruiter`")
  .addField("To set details about a player profile.","`.profile set [fn, ow, csgo, lol, descrip, color, footer] {username or text}`")
  .addField("To set details about a recruiter profile","`.profile set [school, contact , scholarship, esports, social, descrip, color, footer] {username or text}`")
  .addField("To see a sample player profile","`.profile sample player`")
  .addField("To see a sample recruiter profile","`.profile sample recruiter`")
  .setColor("#007BD3")
  .setThumbnail("https://cdn.discordapp.com/attachments/470821393446076437/493465840964993024/erecruit.png")
  message.channel.send(embed);
};

module.exports.help = {
  name: "help"
};
