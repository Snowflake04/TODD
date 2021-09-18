const { SlashCommand, CommandOptionType } = require('slash-create');
const { QueryType } = require('discord-player');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "play",
            description: "Plays a song from youtube",
            options: [
                {
                    name: "song",
                    type: CommandOptionType.STRING,
                    description: "The song you want to play",
                    required: true
                }
            ],

            guildIDs: config.guildId ? [ config.guildId ] : undefined
        });
    }

    async run (cmd) {

        const { client } = require('..');

        await cmd.defer();

        const guild = client.guilds.cache.get(cmd.guildID);
        const channel = guild.channels.cache.get(cmd.channelID);
        const song = cmd.options.song;
        const searchResult = await client.player
            .search(song, {
                requestedBy: cmd.user,
                searchEngine: QueryType.AUTO
            })
            .catch(() => {
                client.logger.log('he')
            });
            if (!searchResult || !searchResult.tracks.length) return void cmd.sendFollowUp({ content: "No results were found!" });

        const queue = await client.player.createQueue(guild, {
            metadata: channel
        });

        const member = guild.members.cache.get(cmd.user.id) 
          //?? await guild.members.fetch(cmd.user.id);
        try {
            if (!queue.connection) await queue.connect(member.voice.channel);
        } catch {
            void client.player.deleteQueue(cmd.guildID);
            return void cmd.sendFollowUp({ content: "**Could not join your voice channel, Please try again!**" });
        }

        await cmd.sendFollowUp({ content: `⏱ | Loading your ${searchResult.playlist ? "playlist" : "track"}...` });
        searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing) await queue.play().catch(console.error)
    }
}
