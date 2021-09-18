const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "shuffle",
            description: "Shuffles the queue",

            guildIDs: config.guildId ? [ config.guildId ] : undefined
        });
    }

    async run (cmd) {

        const { client } = require('..');

        await cmd.defer();

        const queue = client.player.getQueue(cmd.guildID);
        if (!queue || !queue.playing) return void cmd.sendFollowUp({ content: "❌ | No music is being played!" });
        
        await queue.shuffle();
        
        cmd.sendFollowUp({ content: "✅ | Queue has been shuffled!" });
    }
}
