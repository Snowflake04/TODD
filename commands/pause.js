const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "pause",
            description: "Pause the current song",

            guildIDs: config.guildId ? [ config.guildId ] : undefined
        });
    }

    async run (cmd) {

        const { client } = require('..');

        await cmd.defer();

        const queue = client.player.getQueue(cmd.guildID);
        if (!queue || !queue.playing) return void cmd.sendFollowUp({ content: "❌ | No music is being played!" });
        const paused = queue.setPaused(true);
        return void cmd.sendFollowUp({ content: paused ? "⏸ | Paused!" : "❌ | Something went wrong!" });
    }
}
