const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create_project')
		.setDescription('Create a new project and add it to the database.')
        .addStringOption(option => option.setName('name').setDescription('The name of the project').setRequired(true))
        .addStringOption(option => option.setName('description').setDescription('The description of the project').setRequired(true))
        .addMentionableOption(option => option.setName('member').setDescription('The member who will join you on the project')),
	async execute(interaction) {
        const name = interaction.options.getString('name');
        const description = interaction.options.getString('description');
        const member = interaction.options.getMentionable('member');

        const embed = new EmbedBuilder()
            .setAuthor({
                name: interaction.client.user.username,
                iconURL: interaction.client.user.displayAvatarURL()
            })
            .setTitle('Project Created')
            .setDescription(`Project **${name}** has been created and added to the database.`)
            .addFields(
                {name: 'Description', value: description},
                {name: 'Team Member', value: member ? member.toString() : 'None'})
            .setColor('Green')
            .setTimestamp()
            .setFooter({
                text: `Created by: ${interaction.user.username}`,
                iconURL: interaction.user.displayAvatarURL()
            });

        await interaction.reply({ embeds: [embed] });
	},
};
