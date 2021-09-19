const { MessageEmbed } = require('discord.js');
module.exports.registerPlayerEvents = (player, client) => {

    player.on("error", (queue, error) => {
      client.logger.error(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
    });
    player.on("connectionError", (queue, error) => {
        client.logger.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
    });

    player.on("trackStart", (queue, track) => {
   // console.log(queue)  
    let embed = new MessageEmbed()
      
     .setColor("RANDOM") 
      .setAuthor("Now Playing!", "https://i.imgur.com/SGl81h3.gif")
      .setDescription (track.title)
      .addField("Author", track.author)
      .addField("Duration", track.duration)
      .setThumbnail(track.thumbnail)
      .setTimestamp()
      
      queue.metadata.send({embeds: [embed]})
    });

    player.on("trackAdd", (queue, track) => {
        queue.metadata.send(`🎶 | Track **${track.title}** queued!`);
    });

    player.on("botDisconnect", (queue) => {
        queue.metadata.send("❌ | I was manually disconnected from the voice channel, clearing queue!");
    });

    player.on("channelEmpty", (queue) => {
        queue.metadata.send("❌ | Nobody is in the voice channel, leaving...");
    });

    player.on("queueEnd", (queue) => {
        queue.metadata.send("✅ | Queue has ended!");
    });

};
