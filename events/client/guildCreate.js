const { MessageEmbed } = require('discord.js')
module.exports = (client, guild) => {
client.logger.log(`Bot has joined ${guild.name}`)

  let v = client.checkGuild(guild)
  if(!v){
const embed = new MessageEmbed()
  .setTitle(":x: Unauthorised!")
  .setDescription("The bot had been configured to only work on a single guild. Please contact my maintainer if you want to add me to multiple servers")
 .addField('Support',`Contact my Maintainer if you have any concern @LoneWolf#3030`)
  .setTimestamp()
  try{
 
    let channels = []
        guild.channels.cache.forEach(m =>{
          
     if(m.permissionsFor(guild.me).has("SEND_MESSAGES") && m.type === "GUILD_TEXT"){
          channels.push(m)
        }
        })
    
   channels[0].send({embeds: [embed]})
   guild.leave()
    }catch(e){
      (console.log(e))
  channels.random().send({embeds: [embed]})
}
    process.exit()
  }

}