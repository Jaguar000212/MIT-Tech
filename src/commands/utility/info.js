const { SlashCommandBuilder,  ButtonBuilder, ActionRowBuilder } = require('discord.js');

const BotInfo = require('../../helpers/info');

const homeButton = new ButtonBuilder()
    .setCustomId('home')
    .setLabel('Home')
    .setEmoji('🏠')
    .setStyle(1);
const latencyButton = new ButtonBuilder()
    .setCustomId('latency')
    .setLabel('Latency')
    .setEmoji('📡')
    .setStyle(1);
const uptimeButton = new ButtonBuilder()
    .setCustomId('uptime')
    .setLabel('Uptime')
    .setEmoji('🕒')
    .setStyle(1);
const commandsButton = new ButtonBuilder()
    .setCustomId('commands')
    .setLabel('Commands')
    .setEmoji('📜')
    .setStyle(1);
const sourceCodeButton = new ButtonBuilder()
    .setURL('https://github.com/Jaguar000212/MIT-Tech')
    .setLabel('Source Code')
    .setEmoji('📖')
    .setStyle(5);

const rowButtons = new ActionRowBuilder()
			.addComponents(homeButton, latencyButton, uptimeButton, commandsButton, sourceCodeButton);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Get bot information'),
	async execute(interaction) {
        await interaction.editReply({
            embeds: [
                await BotInfo.infoHome(interaction)
            ],
            components: [rowButtons]
        });
    },
};
