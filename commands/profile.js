const Discord = require("discord.js");
const firebase = require("firebase");


//help
module.exports.run = async (bot, message, args) => {
  var config = {
    apiKey: process.env.firebaseAPI,
    authDomain: "erecuiter-88acd.firebaseapp.com",
    databaseURL: "https://erecuiter-88acd.firebaseio.com",
    projsectId: "erecuiter-88acd",
    storageBucket: "erecuiter-88acd.appspot.com",
    messagingSenderId: "129664206886"
  };

 // firebase.initializeApp(config);
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
 }
 //lol, ow, csgo, fortnite
  // Get a reference to the database service

  
  var database = firebase.database();
  var location = database.ref("users/"+message.author.id);
  if(args[0]&&args[0].toLowerCase()=="sample"){
    if(args[0]&&args[1].toLowerCase()=="player"){
      var colors = ["#1162bc","#df6bed","#2ce28c","#da785b","#4b7bff","#e79c4a","#4c7a70","#7acdc3"];
      let squadEmbed = new Discord.RichEmbed()
      .setTitle("FlaSh's Profile | PLAYER")
      .setDescription("Hello! My name is Lee Young-Ho, and I’m interested in playing collegiate esports and have over 5 years of experience in LoL.")
      .setThumbnail(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Lee_Young-Ho_at_2012_Korea_e-Sports_Awards_from_acrofan.jpg/220px-Lee_Young-Ho_at_2012_Korea_e-Sports_Awards_from_acrofan.jpg"
      )
      .setColor(colors[Math.floor(Math.random()*colors.length)])
      .addField("Fortnite", "FlaSh"||"N/A", true)
      .addField("LoL", "FlaSh"||"N/A", true)
      .addField("Overwatch", "FlaSh#11427"||"N/A", true)
      .addField("CSGO", "0neFlash"||"N/A", true)
      .addField("Age", "17"||"N/A", true)
      .addField("Location", "Dallas"||"N/A", true)
      .setFooter("http://www.flash.com/esports"||"")
    message.channel.send(squadEmbed); //Send squad stats



    }else if(args[1]&&args[1].toLowerCase()=="recruiter"){
      
        let squadEmbed = new Discord.RichEmbed()
        .setTitle("Dylan Wray's Profile | RECRUITER")
        .setDescription("Esports at UNT is a varsity program that supports our students as they pursue their passion for esports. UNT is dedicated to developing, guiding, and encouraging our varsity players to compete at the highest level ")
        .setThumbnail(
          "https://recsports.unt.edu/sites/default/files/images/Esports%20Logo%202018.png"
         )
        .setColor("#0B7B40")
        .addField("School", "UNT", true)
        .addField("Contact info", "Dylan.Wray@unt.edu", true)
        .addField("Scholarship", "Possibly offering scholarships", true)
        .addField("Esports program", "Heroes of the Storm | Overwatch | League of Legends | Hearthstone", true)
        .addField("Social Media", "https://twitter.com/UNTEsports", true)
        .setFooter("https://recsports.unt.edu/esports")
      message.channel.send(squadEmbed); //Send squad stats
     


    }else{
      message.channel.send("Which sample do you want to see?. `.profile sample [player, recruiter]`");
       
    }

  }else if(args[0]&&args[0].toLowerCase()=="create"){
  if(args[1]&&(args[1].toLowerCase()=="player"||args[1].toLowerCase()=="recruiter")){
  

    location.once('value', function(snapshot) {
        
          
      if (snapshot.exists()){

        message.channel.send("Looks like you already have an account. `.profile set [fn, ow, csgo, lol, descrip, color, footer] {username or text}`");
       
     
  
  
  
      }
       
      else{
        location.update({
          type: args[1]
         
      
      
        }).catch(function(error) {
          console.log('Failed:', error);
        });
        let rolePlayer = message.guild.roles.find("name","Player");
        let roleRec = message.guild.roles.find("name","Recruiter");
        console.log("lol  "+rolePlayer);
  if(args[1].toLowerCase()=='player'){

    message.member.addRole(rolePlayer).catch(console.error);
  }else{

    message.member.addRole(roleRec).catch(console.error);
  }
        message.channel.send("Sucessfully created a " +args[1] + " account for <@" + message.author.id+">");
       
      }
   })

}
}else if(args[0]&&args[0].toLowerCase()=="set"){
    console.log("hahah")
    if(args[1].toLowerCase()=="fortnite"||args[1].toLowerCase()=="fn"){
      console.log("fuk")
      if(args[2]){
        console.log("yeeee") 
         var username="";
        for(var x=2;x<args.length;x++){
            username+=args[x]+" ";

          }
        location.once('value', function(snapshot) {
        
          
          if (snapshot.exists()){
            message.channel.send("Sucessfully linked your Fortnite account ("+username.trim()+") to your Discord account");
             location.update({
          fortnite: username.trim()
         
      
      
        }).catch(function(error) {
          console.log('Failed:', error);
        });
          }
           
          else{
            message.channel.send("Looks like you have not made an account. `.profile create [player/recruiter]`");
      
           
          }
       })


      }
    



    }else if(args[1]&&args[1].toLowerCase()=="ow"){
      console.log("fuk")
      if(args[2]){
        console.log("yeeee") 
         var username="";
        for(var x=2;x<args.length;x++){
            username+=args[x]+" ";

          }
        location.once('value', function(snapshot) {
        
          
          if (snapshot.exists()){
            message.channel.send("Sucessfully linked your Overwatch account ("+username.trim()+") to your Discord account");
             location.update({
          ow: username.trim()
         
      
      
        }).catch(function(error) {
          console.log('Failed:', error);
        });
          }
           
          else{
            message.channel.send("Looks like you have not made an account. `.profile create [player/recruiter]`");
           
          }
       })
      }
    }else if(args[1]&&args[1].toLowerCase()=="csgo"){
      console.log("fuk")
      if(args[2]){
        console.log("yeeee") 
         var username="";
        for(var x=2;x<args.length;x++){
            username+=args[x]+" ";

          }
        location.once('value', function(snapshot) {
        
          
          if (snapshot.exists()){
            message.channel.send("Sucessfully linked your CSGO account ("+username.trim()+") to your Discord account");
             location.update({
          csgo: username.trim()
         
      
      
        }).catch(function(error) {
          console.log('Failed:', error);
        });
          }
           
          else{
            message.channel.send("Looks like you have not made an account. `.profile create [player/recruiter]`");
           
          }
       })
      }
    }else if(args[1]&&args[1].toLowerCase()=="lol"){
      console.log("fuk")
      if(args[2].toLowerCase()){
        console.log("yeeee") 
         var username="";
        for(var x=2;x<args.length;x++){
            username+=args[x]+" ";

          }
        location.once('value', function(snapshot) {
        
          
          if (snapshot.exists()){
            message.channel.send("Sucessfully linked your LoL account ("+username.trim()+") to your Discord account");
             location.update({
          lol: username.trim()
         
      
      
        }).catch(function(error) {
          console.log('Failed:', error);
        });
          }
           
          else{
            message.channel.send("Looks like you have not made an account. `.profile create [player/recruiter]`");
           
          }
       })
      }
    }else if(args[1]&&args[1].toLowerCase()=="descrip"){
      console.log("fuk")
      if(args[2]&&args[2]){
        console.log("yeeee") 
         var username="";
        for(var x=2;x<args.length;x++){
            username+=args[x]+" ";

          }
        location.once('value', function(snapshot) {
        
          
          if (snapshot.exists()){
            message.channel.send("Sucessfully added a descrption to " + message.author.username +"'s profile");
             location.update({
          descrip: username.trim()
         
      
      
        }).catch(function(error) {
          console.log('Failed:', error);
        });
          }
           
          else{
            message.channel.send("Looks like you have not made an account. `.profile create [player/recruiter]`");
           
          }
       })
      }
    }else if(args[1]&&args[1].toLowerCase()=="color"){
      var re = /[0-9A-Fa-f]{6}/g;
var inputString = args[2];

if(re.test(inputString)) {
  console.log("fuk")
  if(args[2]&&args[2].toLowerCase()){
    console.log("yeeee") 
     var username="";
    for(var x=2;x<args.length;x++){
        username+=args[x]+" ";

      }
    location.once('value', function(snapshot) {
    
      
      if (snapshot.exists()){
        message.channel.send("Updated " + message.author.username +"'s profile color to " +inputString);
         location.update({
      color: username.trim()
     
  
  
    }).catch(function(error) {
      console.log('Failed:', error);
    });
      }
       
      else{
        message.channel.send("Looks like you have not made an account. `.profile create [player/recruiter]`");
       
      }
   })


  }
  
} else {
  
  return message.channel.send(
    "Invaild hex color `Example: #80cb8e`"
  ); //Send error message
}
    }else if(args[1]&&args[1]=="footer"){
      console.log("fuk")
      if(args[2]&&args[2]){
        console.log("yeeee") 
         var username="";
        for(var x=2;x<args.length;x++){
            username+=args[x]+" ";

          }
        location.once('value', function(snapshot) {
        
          
          if (snapshot.exists()){
            message.channel.send("Sucessfully added a footer to " + message.author.username +"'s profile");
             location.update({
          footer: username.trim()
         
      
      
        }).catch(function(error) {
          console.log('Failed:', error);
        });
          }
           
          else{
            message.channel.send("Sucessfully added a footer to " + message.author.username +"'s profile");
            location.set({
              footer: username.trim()
          
          
            }).catch(function(error) {
              console.log('Failed:', error);
            });
           
          }
       })

      }
    }else if(args[1]&&args[1].toLowerCase()=="school"){
      console.log("fuk")
      if(args[2].toLowerCase()){
        console.log("yeeee") 
         var username="";
        for(var x=2;x<args.length;x++){
            username+=args[x]+" ";

          }
        location.once('value', function(snapshot) {
        
          
          if (snapshot.exists()){
            message.channel.send("Sucessfully added school's name to " + message.author.username +"'s profile");
             location.update({
          school: username.trim()
         
      
      
        }).catch(function(error) {
          console.log('Failed:', error);
        });
          }
           
          else{
            message.channel.send("Looks like you have not made an account. `.profile create [player/recruiter]`");
           
          }
       })
      }
    }else if(args[1]&&args[1].toLowerCase()=="contact"){
      console.log("fuk")
      if(args[2]){
        console.log("yeeee") 
         var username="";
        for(var x=2;x<args.length;x++){
            username+=args[x]+" ";

          }
        location.once('value', function(snapshot) {
        
          
          if (snapshot.exists()){
            message.channel.send("Sucessfully added contact info to " + message.author.username +"'s profile");
             location.update({
          contact: username.trim()
         
      
      
        }).catch(function(error) {
          console.log('Failed:', error);
        });
          }
           
          else{
            message.channel.send("Looks like you have not made an account. `.profile create [player/recruiter]`");
           
          }
       })
      }
    }else if(args[1]&&args[1].toLowerCase()=="scholarship"){
      console.log("fuk")
      if(args[2].toLowerCase()){
        console.log("yeeee") 
         var username="";
        for(var x=2;x<args.length;x++){
            username+=args[x]+" ";

          }
        location.once('value', function(snapshot) {
        
          
          if (snapshot.exists()){
            message.channel.send("Sucessfully added a scholarship info to " + message.author.username +"'s profile");
             location.update({
          scholarship: username.trim()
         
      
      
        }).catch(function(error) {
          console.log('Failed:', error);
        });
          }
           
          else{
            message.channel.send("Looks like you have not made an account. `.profile create [player/recruiter]`");
           
          }
       })
      }
    }else if(args[1]&&args[1].toLowerCase()=="esports"){
      console.log("fuk")
      if(args[2]&&args[2]){
        console.log("yeeee") 
         var username="";
        for(var x=2;x<args.length;x++){
            username+=args[x]+" ";

          }
        location.once('value', function(snapshot) {
        
          
          if (snapshot.exists()){
            message.channel.send("Sucessfully added a esports info to " + message.author.username +"'s profile");
             location.update({
          esports: username.trim()
         
      
      
        }).catch(function(error) {
          console.log('Failed:', error);
        });
          }
           
          else{
            message.channel.send("Looks like you have not made an account. `.profile create [player/recruiter]`");
           
          }
       })
      }
    }else if(args[1]&&args[1].toLowerCase()=="social"){
      console.log("fuk")
      if(args[2]&&args[2]){
        console.log("yeeee") 
         var username="";
        for(var x=2;x<args.length;x++){
            username+=args[x]+" ";

          }
        location.once('value', function(snapshot) {
        
          
          if (snapshot.exists()){
            message.channel.send("Sucessfully added social media info to " + message.author.username +"'s profile");
             location.update({
          social: username.trim()
         
      
      
        }).catch(function(error) {
          console.log('Failed:', error);
        });
          }
           
          else{
            message.channel.send("Looks like you have not made an account. `.profile create [player/recruiter]`");
           
          }
       })
      }
    }else{
      return message.channel.send(
        "Command not found. Make sure you are using the right syntax: **Players**: `.profile set [fn, ow, csgo, lol, descrip, color, footer] {username or text}`\n**Recruiters**: `.profile set [school, contact , scholarship, esports, social, descrip, color, footer] {username or text}`."
      ); //Send error message

    }

  }else  if (args[0]&&args[0].toLowerCase()=="get"){
   console.log("nugg");
   try{
    var ref = database.ref("users/" + message.mentions.users.first().id);

    var colors = ["#1162bc","#df6bed","#2ce28c","#da785b","#4b7bff","#e79c4a","#4c7a70","#7acdc3"];
   

    
    ref.once('value', function(snapshot) {
        
          
      if (snapshot.exists()){
        console.log(snapshot.val().type);
  if(snapshot.val().type+""=="player"){
    ref.once("value", function(snapshot) {
      let squadEmbed = new Discord.RichEmbed()
      .setTitle(message.mentions.users.first().username+"'s Profile | PLAYER")
      .setDescription(snapshot.val().descrip||"")
      .setThumbnail(
        message.mentions.users.first().avatarURL||"https://secure.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?size=40&default=https%3A%2F%2Fcdn.discordapp.com%2Favatars%2F258738798047920128%2Fb071fa6eadde6a80c1c7797956c759bb.jpg"
      )
      .setColor(snapshot.val().color||colors[Math.floor(Math.random()*colors.length)])
      .addField("Fortnite", snapshot.val().fortnite||"N/A", true)
      .addField("LoL", snapshot.val().lol||"N/A", true)
      .addField("Overwatch", snapshot.val().ow||"N/A", true)
      .addField("CSGO", snapshot.val().csgo||"N/A", true)
      .addField("Age", snapshot.val().age||"N/A", true)
      .addField("Location", snapshot.val().loc||"N/A", true)
      .setFooter(snapshot.val().footer||"")
    message.channel.send(squadEmbed); //Send squad stats
      console.log(snapshot.val());
    })


  }else{
    ref.once("value", function(snapshot) {
      let squadEmbed = new Discord.RichEmbed()
      .setTitle(message.mentions.users.first().username+"'s Profile | RECRUITER")
      .setDescription(snapshot.val().descrip||"")
      .setThumbnail(
        message.mentions.users.first().avatarURL||"https://secure.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?size=40&default=https%3A%2F%2Fcdn.discordapp.com%2Favatars%2F258738798047920128%2Fb071fa6eadde6a80c1c7797956c759bb.jpg"
      )
      .setColor(snapshot.val().color||colors[Math.floor(Math.random()*colors.length)])
      .addField("School", snapshot.val().school||"N/A", true)
      .addField("Contact info", snapshot.val().contact||"N/A", true)
      .addField("Scholarship", snapshot.val().scholarship||"N/A", true)
      .addField("Esports program", snapshot.val().esports||"N/A", true)
      .addField("Social Media", snapshot.val().social||"N/A", true)
      .setFooter(snapshot.val().footer||"")
    message.channel.send(squadEmbed); //Send squad stats
      console.log(snapshot.val());
    })


  }
        
      }
       
      else{
        message.channel.send("Error, " +message.mentions.users.first().username + " does not have any accounts linked");
      }
   })
    // Attach an asynchronous callback to read the data at our posts reference
   


   }catch(exception){
    message.channel.send("Error, " +message.mentions.users.first().username + " does not have any accounts linked");

   }


      
    



  }

else{
  return message.channel.send(
    "The profile system is used to connect esport players with recrutiers. \n**Create an Account:** `.profile create [player/recruiter]`\n**Players:**: `.profile set [fn, ow, csgo, lol, descrip, color, footer] {username or text}`\n**Recruiters:**: `.profile set [school, contact , scholarship, esports, social, descrip, color, footer] {username or text}`."
  )};
  }
 

 
  


  //COMMAND EXECUTION GOES HERE


module.exports.help = {
  name: "profile"
};
