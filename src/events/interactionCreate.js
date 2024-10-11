const BotInfo = require('../helpers/info');

module.exports = async (client, interaction) => {
    if (interaction.isChatInputCommand()) {
        await interaction.deferReply();
        const command = client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.followUp({
                content: 'There was an error while executing this command!',
                ephemeral: true
            });
        }
    } else if (interaction.isButton()) {
        try {
            if (interaction.customId === 'home') {
                await interaction.message.edit({
                    embeds: [
                        await BotInfo.infoHome(interaction)
                    ],
                    components: [interaction.message.components[0]]
                });
            }
            if (interaction.customId === 'latency') {
                await interaction.message.edit({
                    embeds: [
                        await BotInfo.getLatency(interaction)
                    ],
                    components: [interaction.message.components[0]]
                });
            }
            if (interaction.customId === 'uptime') {
                await interaction.message.edit({
                    embeds: [
                        await BotInfo.getUptime(interaction)
                    ],
                    components: [interaction.message.components[0]]
                });
            }
            if (interaction.customId === 'commands') {
                await interaction.message.edit({
                    embeds: [
                        await BotInfo.getCommands(interaction)
                    ],
                    components: [interaction.message.components[0]]
                });
            }
            await interaction.deferUpdate();
        } catch (error) {
            console.error(error);
            await interaction.reply({content: 'There was an error while executing this button!', ephemeral: true});
        }
    }
};