const { SlashCommand, CommandOptionType } = require('slash-create');

module.exports = class Volume extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "volume",
            description: "Sets music volume",
            options: [
                {
                    name: "amount",
                    type: CommandOptionType.INTEGER,
                    description: "The volume amount to set (0-100)",
                    required: false
                }
            ],

            guildIDs: config.guildId ? [ config.guildId ] : undefined
        });
    }

    async run(cmd) {
        
        const { client } = require('..');
        
        await cmd.defer();
        const queue = client.player.getQueue(cmd.guildID);
        if (!queue || !queue.playing) return void cmd.sendFollowUp({ content: "❌ | No music is being played!" });
        const vol = parseInt(cmd.options.amount);
        if (!vol) return void cmd.sendFollowUp({ content: `🎧 | Current volume is **${queue.volume}**%!` });
        if (vol < 0 || vol > 100) return void cmd.sendFollowUp({ content: "❌ | Volume range must be 0-100" });
        const success = queue.setVolume(vol);
        return void cmd.sendFollowUp({
            content: success ? `✅ | Volume set to **${vol}%**!` : "❌ | Something went wrong!"
        });

    }
}
