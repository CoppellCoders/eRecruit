const Discord = require("discord.js");
const csgoStats = require('csgo-stats');
const superagent = require("superagent");
const parser = require('superagent-xml2jsparser');

module.exports.run = async (bot, message, args) => {
  let username = args[0];
  let steamID = await getSteamID(username);
  username = steamID.id;
  let playerStats = await getPlayerStats(username);

  let embed = new Discord.RichEmbed()
    .setTitle(`## CSGO STATS FOR ${username.toUpperCase()} ##`)
    .setThumbnail(steamID.avatar)
    .addField("Profile Overview", `Overall Stats for **${username}**`)
    .addField("Kills", playerStats.profile.kills, true)
    .addField("Accuracy", playerStats.profile.shotsHit / playerStats.profile.shotsFired, true)
    .addField("Headshots", playerStats.profile.headshots, true)
    .addField("HS %", playerStats.profile.headshots / playerStats.profile.shotsFired, true)
    .addField("Time Played", playerStats.profile.time / 60, true)
    .addField("Competitive Wins", playerStats.profile.matchesWon, true)
    .addField("Win %", playerStats.profile.matchesWon / playerStats.profile.matchesPlayed, true)
    .addField("MVPs", playerStats.profile.mvps, true);

  return message.channel.send(embed);

  async function getPlayerStats(username) {
    return new Promise(funtion(resolve, reject){
      var  stats = {};
      csgoStats.load({
        key: process.env.steam_token,
        id: username
      }).then(r => {
        let stats = r.body.playerstats.stats;

        let kills = stats.total_kills;
        let headshots = stats.total_kills_headshot;
        let deaths = stats.total_deaths;
        let time = stats.total_time_played;
        let plants = stats.total_planted_bombs;
        let defuses = stats.total_defused_bombs;
        let wins = stats.total_wins;
        let mvps = stats.total_mvps;
        let matchesPlayed = stats.total_matches_played;
        let matchesWon = stats.total_matches_won;
        let shotsFired = stats.total_shots_fired;
        let shotsHit = stats.total_shot_hit;

        resolve({
          profile: {
            kills: kills,
            headshots: headshots,
            deaths: deaths,
            time: time,
            plants: plants,
            defuses: defuses,
            wins: wins,
            mvps: mvps,
            matchesPlayed: matchesPlayed,
            matchesWon: matchesWon,
            shotsFired: shotsFired,
            shotsHit: shotsHit
          }
        });
      }).catch(e => {
        return message.channel.send("Unknow error Occurred. Please try again. If this issue keeps arising, use the **`.issue`** command to report it.");
      })
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
