const { SlashCommand, CommandOptionType } = require('slash-create');

module.exports = class Jump extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "jump",
            description: "skips to a specific track",
            options: [
                {
                    name: "amount",
                    description: "The number of tracks to skip",
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
        
        const tracksCount = cmd.options.tracks;
        queue.jump(tracksCount);

        cmd.sendFollowUp({ content: `⏭ | Skipped ${tracksCount} tracks` });
    }
}
