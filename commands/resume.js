const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "resume",
            description: "Resume the current song",

            guildIDs: config.guildId ? [ config.guildId ] : undefined
        });
    }

    async run (cmd) {

        const { client } = require('..');

        await cmd.defer();

        const queue = client.player.getQueue(cmd.guildID);
        if (!queue || !queue.playing) return void cmd.sendFollowUp({ content: "❌ | No music is being played!" });
        const paused = queue.setPaused(false);
        return void cmd.sendFollowUp({ content: !paused ? "▶ | Resumed!" : "❌ | Something went wrong!" });
    }
}
