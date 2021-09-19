const { SlashCommand } = require('slash-create');

module.exports = class Back extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "previous",
            description: "Plays the previous track",

            guildIDs: config.guildId ? [config.guildId] : undefined
        });
    }

    async run (cmd) {

        const { client } = require('..');

        await cmd.defer();

        const queue = client.player.getQueue(cmd.guildID);
        if (!queue || !queue.playing) return void cmd.sendFollowUp({ content: "**Nothing is Playing right now!**" });
        
        await queue.back();

        cmd.sendFollowUp({ content: "✅ | Playing the previous track!" });
    }
}
