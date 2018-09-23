const Discord = require("discord.js");
const fetch = require('node-fetch');
var fs = require('fs');
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
    }).then(async function(json){
        var summonerId = json['id'];
        var accountId = json['accountId'];
        var name = json['name'];
        var level = json['summonerLevel'];
        var icon = json['profileIconId'];
        var winRates = await getWinRate(prefix, accountId);
        var masteryUrl = 'https://'+prefix+'.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/'+parseInt(summonerId);
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
            .addField('Recent Games', `${winRates.games} G ${winRates.wins}W/${winRates.losses}L WR: ${winRates.percent} %`)
            .addField('Top Mastery: ', `[${json[0]['championLevel']}] 1.${champIds[json[0]['championId']]} : ${json[0]['championPoints']}
            [${json[1]['championLevel']}] 2.${champIds[json[1]['championId']]} : ${json[1]['championPoints']}
            [${json[2]['championLevel']}] 3.${champIds[json[2]['championId']]} : ${json[2]['championPoints']}`, true)
            var rankUrl = 'https://'+prefix+'.api.riotgames.com/lol/league/v3/positions/by-summoner/'+parseInt(summonerId);
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
                var livegameUrl = 'https://'+prefix+'.api.riotgames.com/lol/spectator/v3/active-games/by-summoner/'+parseInt(summonerId);
                fetch(livegameUrl, {
                    method: 'GET',
                    headers: {'X-Riot-Token': process.env.league_key}
                }).then(function(response){
                    return response.json();
                }).then(async function(json){
                    var obj = JSON.parse(fs.readFileSync('./commands/gamemodes.json', 'utf8'));
                    if(json['gameId']){
                        embed.addField('Live Game', `${username} has been playing ${obj[json['gameQueueConfigId']]["Custom"]} for ${Math.floor(json['gameLength']/60)} minutes and ${json['gameLength']%60} seconds`)
                    }else{
                        embed.addField('Live Game', `${username} is not currently in game`)
                    }
                    var temp = await getLastMatch(prefix, accountId);
                    var matchData = await getMatchStats(temp['gameId'], accountId, prefix);
                    embed.addField('Last Game', `${obj[matchData['type']]['Custom']} as ${champIds[matchData.champion]} and went ${matchData.kills}/${matchData.deaths}/${matchData.assists} and had ${matchData.cs} CS`)
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

async function getWinRate(prefix, accountId){
    return new Promise(function(resolve, reject){
        var requestUrl = 'https://'+prefix+'.api.riotgames.com/lol/match/v3/matchlists/by-account/'+parseInt(accountId);
        var myValue = "hi";
        fetch(requestUrl,{
            method: 'GET',
            headers: {'X-Riot-Token': process.env.league_key}
        }).then(function(response){
            return response.json();
        }).then(async function(json){
            var len = Math.min(json['matches'].length, 10);
            var wins = 0;
            for(var i = 0; i < len; i++){
                var gameId = json['matches'][i]['gameId'];
                var result = await getGameResult(gameId, accountId, prefix);
                console.log(result);
                if(result == true){
                    wins++;
                }
            }
            var data = {
                wins: wins,
                games: len,
                losses: len-wins,
                percent: Math.round((wins/len*100))
            }
            resolve(data);
        })
    })
}

async function getGameResult(gameId, accountId, prefix){
    return new Promise(function(resolve, reject){
        var requestUrl = 'https://'+prefix+'.api.riotgames.com/lol/match/v3/matches/'+parseInt(gameId);
        fetch(requestUrl,{
            method: 'GET',
            headers: {'X-Riot-Token': process.env.league_key}
        }).then(function(response){
            return response.json();
        }).then(function(json){
            var participants = json['participantIdentities'];
            var participantId = -1;
            for(var i = 0; i < participants.length; i++){
                if(participants[i]['player']['accountId'] == accountId){
                    participantId = i;
                    break;
                }
            }
            var win = json['participants'][participantId]['stats']['win'];
            resolve(win);

        })
    })
}

async function getLastMatch(prefix, accountId){
    return new Promise(function(resolve, reject){
        var requestUrl = 'https://'+prefix+'.api.riotgames.com/lol/match/v3/matchlists/by-account/'+parseInt(accountId);
        var myValue = "hi";
        fetch(requestUrl,{
            method: 'GET',
            headers: {'X-Riot-Token': process.env.league_key}
        }).then(function(response){
            return response.json();
        }).then(function(json){
            resolve(json['matches'][0]);
        })
    })

}

async function getMatchStats(matchId, accountId, prefix){
    return new Promise(function(resolve, reject){
        var requestUrl = 'https://'+prefix+'.api.riotgames.com/lol/match/v3/matches/'+parseInt(matchId);
        fetch(requestUrl,{
            method: 'GET',
            headers: {'X-Riot-Token': process.env.league_key}
        }).then(function(response){
            return response.json();
        }).then(function(json){
            var participants = json['participantIdentities'];
            var participantId = -1;
            for(var i = 0; i < participants.length; i++){
                if(participants[i]['player']['accountId'] == accountId){
                    participantId = i;
                    break;
                }
            }
            var kills = json['participants'][participantId]['stats']['kills'];
            var deaths = json['participants'][participantId]['stats']['deaths'];
            var assists = json['participants'][participantId]['stats']['assists'];
            var champion = json['participants'][participantId]['championId'];
            var cs = json['participants'][participantId]['stats']['totalMinionsKilled'];
            var type = json['queueId'];
            var data = {
                kills: kills,
                deaths: deaths,
                assists: assists,
                champion: champion,
                cs: cs,
                type: type
            };
            resolve(data);

        })
    })
}


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
