const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "skip",
            description: "Skip to the current song",

            guildIDs: config.guildId ? [ config.guildId ] : undefined
        });
    }

    async run(cmd) {
        
        const { client } = require('..');
        
        await cmd.defer();
        const queue = client.player.getQueue(cmd.guildID);
        if (!queue || !queue.playing) return void cmd.sendFollowUp({ content: "❌ | No music is being played!" });
        const currentTrack = queue.current;
        const success = queue.skip();
        return void cmd.sendFollowUp({
            content: success ? `✅ | Skipped **${currentTrack}**!` : "❌ | Something went wrong!"
        });

    }
}
