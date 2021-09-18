const { SlashCommand, CommandOptionType } = require('slash-create');
const { QueueRepeatMode } = require('discord-player');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "loop",
            description: "Sets loop mode",
            options: [
                {
                    name: "mode",
                    type: CommandOptionType.INTEGER,
                    description: "Choose 0-3",
                    required: true,
                    choices: [
                        {
                            name: "0 => Off",
                            value: QueueRepeatMode.OFF
                        },
                        {
                            name: "1 => Current Track",
                            value: QueueRepeatMode.TRACK
                        },
                        {
                            name: "2 => Queue",
                            value: QueueRepeatMode.QUEUE
                        },
                        {
                            name: "3 => Autoplay",
                            value: QueueRepeatMode.AUTOPLAY
                        }
                    ]
                }
            ],

            guildIDs: config.guildId ? [ config.guildId ] : undefined
        });
    }

    async run (cmd) {

        const { client } = require('..');

        await cmd.defer();
        const queue = client.player.getQueue(cmd.guildID);
        if (!queue || !queue.playing) return void cmd.sendFollowUp({ content: "**❌ | No music is being played right now!**" });
        const loopMode = cmd.options.mode;
        const success = queue.setRepeatMode(loopMode);
        const mode = loopMode === QueueRepeatMode.TRACK ? "🔂" : loopMode === QueueRepeatMode.QUEUE ? "🔁" : "▶";
        return void cmd.sendFollowUp({ content: success ? `${mode} | Updated loop mode!` : "❌ | Could not update loop mode!" });
    }
}
