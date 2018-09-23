const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
    .setTitle("## REPORT AN ISSUE WITH THE BOT ##")
    .setDescription(
      "Unfortunately, nothing is perfect. Please report any abnormal activity from the bot and if any commands are unresponsive."
    )
    .setThumbnail(
      "https://www.internetmatters.org/wp-content/uploads/2015/06/issue-cyber.png"
    )
    .addField(
      "Github (Primary Issue Tracker)",
      "https://github.com/CoppellCoders/eRecruit/issues"
    );
  return message.channel.send(embed); //Sends issue message
};

module.exports.help = {
  name: "issue"
};
