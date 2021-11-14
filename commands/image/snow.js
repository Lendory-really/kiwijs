const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('snow')
		.setDescription('Добавляет эффект снежинок на аватар')
    .addUserOption(option => option.setName('target').setDescription('Select a user')),
	async execute(interaction, client) {
    let user = interaction.options.getUser('target');
    if (user) {
      console.log(" ")
    } else {
      user = interaction.user
    }
    let avatar = user.avatarURL({size: 2048, dynamic: true, format: "jpg"})
    const embed = {
	    title: 'Эффект снежинок',
	    description: `**Юзер:** ${user.tag}`,
      color: "#083ebe",
      image: {
        url: `https://api.no-api-key.com/api/v2/snow?image=${avatar}`
      }
	  }
		await interaction.reply({embeds: [embed]});
	},
};