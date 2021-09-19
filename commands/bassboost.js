const { SlashCommand } = require('slash-create');

module.exports = class Bass extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "bassboost",
            description: "Add or remove Bass filter",

            guildIDs: config.guildId ? [ config.guildId ] : undefined
        });
    }

    async run (cmd) {

        const { client } = require('..');

        await cmd.defer();

        const queue = client.player.getQueue(cmd.guildID);
        if (!queue || !queue.playing) return void cmd.sendFollowUp({ content: "❌ | No music is being played!" });
        await queue.setFilters({
            bassboost: !queue.getFiltersEnabled().includes("bassboost"),
            normalizer2: !queue.getFiltersEnabled().includes("bassboost") // because we need to toggle it with bass
        });

        setTimeout(() => {
            return void cmd.sendFollowUp({ content: `🎵 | Bassboost ${queue.getFiltersEnabled().includes("bassboost") ? "Enabled" : "Disabled"}!` });
        }, queue.options.bufferingTimeout);
    }
}
