const Discord = require("discord.js");
const fetch = require('node-fetch');

//help
module.exports.run = async (bot, message, args) => {
  var command = args[0];
  if(command == 'profile'){
    var champIds = {};
    fetch('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json',{
        method:'GET'
    }).then(function(response){
        return response.json();
    }).then(function(json){
        var obj = json['data'];
        Object.keys(obj).forEach(function(key){
            champIds[obj[key]['key']] = key;
        })
    })
    var region = args[1];
    region = region.toUpperCase();
    var username = args[2];
    var prefix = getPrefix(region);
    var requestUrl = 'https://'+prefix+'.api.riotgames.com/lol/summoner/v3/summoners/by-name/'+username;
    fetch(requestUrl, {
        method: 'GET',
        headers: {'X-Riot-Token': process.env.league_key}
    }).then(function(response){
        return response.json();
    }).then(function(json){
        var accountId = json['id'];
        var name = json['name'];
        var level = json['summonerLevel'];
        var icon = json['profileIconId'];
        var masteryUrl = 'https://'+prefix+'.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/'+parseInt(accountId);
        fetch(masteryUrl, {
            method: 'GET',
            headers: {'X-Riot-Token': process.env.league_key}
        }).then(function(response){
            return response.json();
        }).then(function(json){
            let embed = new Discord.RichEmbed()
            embed.setThumbnail('http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/'+icon+'.png')
            .setColor('#FFDF00')
            .setTitle(`LOL PROFILE: ${name.toUpperCase()}`)
            .addField(`Level/Region`, `${level}/${region}`, true)
            .addField('Top Mastery: ', `[${json[0]['championLevel']}] 1.${champIds[json[0]['championId']]} : ${json[0]['championPoints']}
            [${json[1]['championLevel']}] 2.${champIds[json[1]['championId']]} : ${json[1]['championPoints']}
            [${json[2]['championLevel']}] 3.${champIds[json[2]['championId']]} : ${json[2]['championPoints']}`, true)
            var rankUrl = 'https://'+prefix+'.api.riotgames.com/lol/league/v3/positions/by-summoner/'+parseInt(accountId);
            fetch(rankUrl, {
                method: 'GET',
                headers: {'X-Riot-Token': process.env.league_key}
            }).then(function(response){
                return response.json();
            }).then(function(json){
                embed.addBlankField();
                try{
                var soloRank = json[0]['tier'] + " " + json[0]['rank']  +" "+ json[0]['leaguePoints'] + "LP";
                var soloWins = parseInt(json[0]['wins']);
                var soloLosses = parseInt(json[0]['losses']);
                var soloStats = (soloWins+soloLosses+"G") +" " + json[0]['wins']+"W/"+json[0]['losses']+"L " + Math.round((soloWins)/(soloWins+soloLosses)*100) +"%";
                embed.addField('Ranked Solo', soloRank + "\n" + soloStats, true);
                }catch(e){

                }try{
                var flexRank = json[1]['tier'] + " " + json[1]['rank']  +" "+ json[1]['leaguePoints'] + "LP";
                var flexWins = parseInt(json[1]['wins']);
                var flexLosses = parseInt(json[1]['losses']);
                var flexStats = (flexWins+flexLosses+"G") +" " + json[1]['wins']+"W/"+json[1]['losses']+"L " + Math.round((flexWins)/(flexWins+flexLosses)*100) +"%";
                embed.addField('Ranked Flex', flexRank + "\n" + flexStats, true);
                }catch(e){

                }
                var livegameUrl = 'https://'+prefix+'.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/'+parseInt(accountId);
                fetch(livegameUrl, {
                    method: 'GET',
                    headers: {'X-Riot-Token': process.env.league_key}
                }).then(function(response){
                    return response.json();
                }).then(function(json){
                    console.log(json['gameId']);
                    if(json['gameId']){
                        embed.addField('Live Game', `${username} is in game`)
                    }else{
                        embed.addField('Live Game', `${username} is not currently in game`)
                    }
                    message.channel.send(embed);
                })
                
            })
          
        })
    })
  }else if(command == 'playedwith'){

  }else{
      return message.channel.send('Invalid argument');
  }
};


function getPrefix(region){
    switch(region){
        case 'BR':
            return 'BR1';
        case 'EUNE':
            return 'EUN1';
        case 'EUW':
            return 'EUW1';
        case 'JP':
            return 'JP1';
        case 'KR':
            return 'KR';
        case 'LAN':
            return 'LA1';
        case 'LAS':
            return 'LA2';
        case 'NA':
            return 'NA1';
        case 'OCE':
            return 'OC1';
        case 'TR':
            return 'TR1';
        case 'RU':
            return 'RU';
        case 'PBE':
            return 'PBE1';
    }
}

module.exports.help = {
  name: "lol"
};
