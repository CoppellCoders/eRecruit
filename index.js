const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.login('NDkzMDY3OTU3OTY3MjU3NjA1.DofnFQ.9IaLjefLYLeglVLhhWdECpinN6Y');