const { SlashCommand, CommandOptionType } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "seek",
            description: "Seeks to the given time",
            options: [
                {
                    name: "time",
                    description: "The time to seek to (in seconds)",
                    type: CommandOptionType.INTEGER
                }
            ],

            guildIDs: config.guildId ? [ config.guildId ] : undefined
        });
    }

    async run (cmd) {

        const { client } = require('..');

        await cmd.defer();

        const queue = client.player.getQueue(cmd.guildID);
        if (!queue || !queue.playing) return void cmd.sendFollowUp({ content: "❌ | No music is being played!" });
        
        const time = cmd.options.time * 1000;
        await queue.seek(time);

        cmd.sendFollowUp({ content: `✅ | Seeked to ${time / 1000} seconds` });
    }
}
