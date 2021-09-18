const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "stop",
            description: "Stop the player",

            guildIDs: config.guildId ? [ config.guildId ] : undefined
        });
    }

    async run(cmd) {
        
        const { client } = require('..');

        await cmd.defer();
        const queue = client.player.getQueue(cmd.guildID);
        if (!queue || !queue.playing) return void cmd.sendFollowUp({ content: "❌ | No music is being played!" });
        queue.destroy();
        return void cmd.sendFollowUp({ content: "🛑 | Stopped the player!" });

    }
}
