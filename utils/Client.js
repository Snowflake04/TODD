const Discord = require('discord.js');
const { Player } = require('discord-player');
const fs = require('fs')

class Client extends Discord.Client {
	
  

	constructor(config,  options = {}) {
		super(options); 
//logger
  this.logger = require("./logger.js")

//player
this.player = new Player(this)

this.owner = config.ownerId

this.maintainer = config.maintainerId



    this.logger.log("initalising...")
  }

loadEvents() {
  const eventFiles = fs.readdirSync('./events/client').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`../events/client/${file}`);
    const eventName = file.split(".")[0];
    this.logger.log(`Loading Event - ${eventName}`);
    super.on(eventName, event.bind(null, this));
}
}

  
  checkGuild(guild){
  let target = config.guildId;
if(target === guild.id) return true;
  else return false;
}


checkOwner(user){
  if(user.id === this.ownerId) return true;
  else return false;
}

}
module.exports = Client