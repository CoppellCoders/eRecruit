const Discord = require("discord.js");
const csgoStats = require('csgo-stats');
const superagent = require("superagent");
const parser = require('superagent-xml2jsparser');

module.exports.run = async (bot, message, args) => {
  let username = args[0];
  let steamID = await getSteamID(username);
  username = steamID.id;
  let playerStats = await getPlayerStats(username, args[0]);

  async function getPlayerStats(username) {
    var stats = {};
    csgoStats.load({
      key: process.env.steam_token,
      id: username
    }).then(r => {
      let stats = r.body.playerstats.stats;
      // console.log(stats);
      let kills = stats[0].value;
      let headshots = stats[24].value;
      let deaths = stats[1].value;
      let time = stats[2].value;
      let plants = stats[3].value;
      let defuses = stats[4].value;
      let mvps = stats[93].value;
      let matchesPlayed = stats[113].value;
      let matchesWon = stats[112].value;
      let shotsFired = stats[42].value;
      let shotsHit = stats[41].value;
      // console.log(kills);
      let embed = new Discord.RichEmbed()
        .setTitle(`** CSGO STATS FOR ${args[0].toUpperCase()} **`)
        .setThumbnail(steamID.avatar)
        .setColor("#4298f4")
        .addField("Profile Overview", `Overall Stats for **${args[0]}**`)
        .addField("Kills", kills, true)
        .addField("Accuracy", `${Math.round((shotsHit / shotsFired) * 10000) / 100}%`, true)
        .addField("Headshots", headshots, true)
        .addField("HS %", `${Math.round((headshots / kills) * 10000) / 100}%`, true)
        .addField("Time Played", `${Math.ceil(time / 3600)} hours`, true)
        .addField("Competitive Wins", matchesWon, true)
        .addField("Win %", `${Math.round((matchesWon / matchesPlayed) * 10000) / 100}%`, true)
        .addField("MVPs", mvps, true);

      message.channel.send(embed);
    }).catch(e => {
      console.log(e);
      message.channel.send("Unknow error Occurred. Please try again. If this issue keeps arising, use the **`.issue`** command to report it.");
    })
  }

  async function getSteamID(username) {
    let { body } = await superagent.get(`https://steamcommunity.com/id/${username}/?xml=1`)
      .accept(`xml`)
      .parse(parser);
    let steamID = body.profile.steamID64[0];
    let avatar = body.profile.avatarFull[0];
    return {
      id: steamID,
      avatar: avatar
    };
  }
};

module.exports.help = {
  name: "csgo"
};
