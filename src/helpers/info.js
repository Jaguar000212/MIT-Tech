const { EmbedBuilder } = require('discord.js');

module.exports = class BotInfo {
    static async getUptime(interaction) {
        return new EmbedBuilder()
            .setTitle('Bot Uptime')
            .setDescription(`The bot has been online for ${(interaction.client.uptime)/1000} seconds`)
            .setColor('Green')
            .setTimestamp()
            .setFooter({
                text: `Requested by: ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL()
            });
    }

    static async getLatency(interaction) {
        return new EmbedBuilder()
            .setTitle('Bot Latency')
            .setDescription(`The bot's latency is ${interaction.client.ws.ping}ms`)
            .setColor('Green')
            .setTimestamp()
            .setFooter({
                text: `Requested by: ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL()
            });
    }

    static async getCommands(interaction) {
        const commands = interaction.client.commands.map(command => command.data.toJSON());
        return new EmbedBuilder()
            .setTitle('Bot Commands')
            .setDescription(`Here are the commands available for this bot.`)
            .addFields(
                { name: 'Commands', value: commands.map(command => command.name).join(', ') },
                { name: 'Total Commands', value: commands.length.toString() }
            )
            .setColor('Green')
            .setTimestamp()
            .setFooter({
                text: `Requested by: ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL()
            });
    }

    static async infoHome(interaction) {
        return new EmbedBuilder()
            .setAuthor({
                name: interaction.client.user.username,
                iconURL: interaction.client.user.displayAvatarURL()
            })
            .setTitle(interaction.client.user.tag)
            .setDescription('A bot made for our MIT server to automate several tasks and easily manage important stuffs related to the core idea of this server.')
            .setFields({
                    name: 'Developers',
                    value: 'Shryansh Parashar\nPranay Kapoor',
                    inline: true
                },
                {
                    name: 'Since',
                    value: 'October 2024',
                    inline: true
                },
                {
                    name: 'Version',
                    value: '1.0.0',
                    inline: true
                },
                {
                    name: 'Library',
                    value: '`discord.js`, database using `sqlite3`',
                    inline: true
                })
            // .setColor(interaction.client.user.accentColor)
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .setFooter({
                text: `Requested by: ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL()
            });
    }
}

