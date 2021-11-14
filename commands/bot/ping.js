const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('То что все делалось по туториалу все отменяет!'),
	async execute(interaction, client) {
    const embed = {
	    title: 'Понг!',
	    description: `Пинг: ${client.ws.ping}ms`,
      color: "#083ebe"
	  }
		await interaction.reply({embeds: [embed]});
	},
};