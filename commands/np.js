const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "np",
            description: "See what's currently being played",

            guildIDs: config.guildId ? [ config.guildId ] : undefined
        });
    }

    async run (cmd) {

        const { client } = require('..');

        await cmd.defer();

        const queue = client.player.getQueue(cmd.guildID);
        if (!queue || !queue.playing) return void cmd.sendFollowUp({ content: "❌ | No music is being played!" });
        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return void cmd.sendFollowUp({
            embeds: [
                {
                    title: "Now Playing",
                    description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
                    fields: [
                        {
                            name: "\u200b",
                            value: progress
                        }
                    ],
                    color: 0xffffff
                }
            ]
        });
    }
}
