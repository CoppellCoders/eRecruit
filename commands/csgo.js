const Discord = require("discord.js");
const csgoStats = require('csgo-stats');

module.exports.run = async (bot, message, args) => {
  csgoStats.load({
    key: process.env.steam_token,
    id: '76561198163526670'
  }).then(r => {
    console.log(r.body.playerstats.stats)
  }).catch(e => console.error(e));
};

module.exports.help = {
  name: "csgo"
};
