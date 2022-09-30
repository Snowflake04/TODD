const config = require('./config.js')
const path = require('path');
const { SlashCreator, GatewayServer } = require('slash-create');
const Client  = require("./utils/Client");
const { registerPlayerEvents } = require('./events/player.js');

global.config = config
const client = new Client(config, {
    intents: [
        'GUILDS',
        'GUILD_VOICE_STATES'
                ]
});

registerPlayerEvents(client.player, client);


const creator = new SlashCreator({
  applicationID: config.appId,
  token: config.token,
});


client.loadEvents()    
creator
    .withServer(
        new GatewayServer(
            (handler) => client.ws.on('INTERACTION_CREATE', handler)
        )
    )
    .registerCommandsIn(path.join(__dirname, 'commands'));

if (config.guildId) creator.syncCommandsIn(config.guildId);
else creator.syncCommands();

client.login(config.token);

module.exports.client = client;
module.exports.creator = creator;

//rejection
process.on('unhandledRejection', err => client.logger.error(err))
