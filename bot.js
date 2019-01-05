const Discord = require("discord.js");
const ms = require("ms");
const fs = require('fs');
const moment = require('moment');
const request = require('request');
const dateFormat = require('dateformat');
const r1 = require('snekfetch');
const jimp = require('jimp')
const math = require('math-expression-evaluator'); 
const child_process = require("child_process");
const Canvas = require('canvas');
var prefix = "^"
const client = new Discord.Client();
const agree = "✅";
const disagree = "❌";

const invites = {};

const wait = require('util').promisify(setTimeout);

client.on('ready', () => {

    var channelxd;
    setInterval(() => {
        client.user.setGame(`GBot on ${client.guilds.size} Servers`,'https://www.twitch.tv/gbot');
    }, 5000);

  console.log(' GBot Is Online')
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
  
});



client.on('message', async message => {
	    let args = message.content.split(' ').slice(1).join(' ');
    
      
 
   let embed = new Discord.RichEmbed()


    let args1 = message.content.split(' ').slice(1).join(' ');


     if(!message.channel.guild) return;

	
	
     if (message.content.startsWith(prefix + "bc")) {
	             if(!message.member.hasPermission("ADMINISTRATOR")){
        message.delete
              message.channel.send(`**ليس لديك صلاحية**`);
              message.delete();
    
        }else if(!args[1]){

                 message.channel.send(`**اكتب كلمة او جملة**`);
    
    
    
                 message.delete();
    
        }else{
    
    
            message.channel.send(` ** هل أنت متأكد من أرسالك الرسالة الى جميع الأعضاء؟ \n ` + args1 + ` : محتوى الرسالة **` )
            .then(function (msg){
        
		 msg.react(agree)
                            .then(() => msg.react(disagree));
            let reactionaFilter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
            let reactiondFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
                      
        
            let reactiona = msg.createReactionCollector(reactionaFilter, { time: 12000 });
            let reactiond = msg.createReactionCollector(reactiondFilter, { time: 12000 });
            reactiona.on("collect", r => {
    
                message.delete(5000);
                msg.delete(5000);
         
                let embed = new Discord.RichEmbed()
                .setColor("#FF00FF")
                .setThumbnail(message.author.avatarURL)  
                                                  .addField(agree + ' | تم الارسال بواسطة ', "<@" + message.author.id + ">")
						.addField(`عدد الأعضاء المرسل لهم` , `${member.guild.memberCount}`)
                             message.channel.sendEmbed(embed).then((m3) => {
				    m3.delete(5000);
			     });
                    message.guild.members.forEach(m => {
                        var bc = new Discord.RichEmbed()
			 .setThumbnail(message.author.avatarURL)  
                        .addField('**● Sender  :**', `*** → ${message.author.username}#${message.author.discriminator}***`)
                        .addField('***● Server  :***', `*** → `+ message.guild.name +` ***`)               
                .setColor('#ff0000')
                             .addField('***● Message  :***  ', "→ " + args1)
                        m.send(``,{embed: bc});
                        message.delete(5000);
                        msg.delete(5000);
			msg.delete(5000);
                        
	    });
            })
            reactiond.on("collect", r => {
                message.delete();
                msg.delete();
                message.channel.send("** ❌ تم الألغاء **").then((m4) => {
				     m4.delete(5000);
			     });
                message.delete();
                msg.delete();
		                msg.delete(5000);
            })
        
            })       
    
        }
    
    
            
        
                
    
    
        }
    
        
     
    

})

client.login(process.env.BOT_TOKEN);
