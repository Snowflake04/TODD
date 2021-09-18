module.exports = async(client, msg) => {

  /*if(msg.content.startsWith("eval")){
  const m = msg.content.split(" ")[1];
  const v = await eval(m)
  console.log(v)
}
  if(msg.content === "!test"){
    try{
      let channels = []
        msg.guild.channels.cache.forEach(m =>{
          
     if(m.permissionsFor(msg.guild.me).has("SEND_MESSAGES") && m.type === "GUILD_TEXT"){
          channels.push(m)
        }
        })
    console.log(channels[0]) 
   channels[0].send({embed: embed}
   
    }catch(e){
      (console.log(e))
    }
}*/
if(msg.content === `<@${client.user.id}>`){
  msg.reply({content: " Online"})
}
}