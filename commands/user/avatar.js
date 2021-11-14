const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Выдает аватар юзера')
    .addUserOption(option => option.setName('target').setDescription('Select a user')),
	async execute(interaction, client) {
    let user = interaction.options.getUser('target');
    if (user) {
      console.log(" ")
    } else {
      user = interaction.user
    }
    let avatar = user.avatarURL({size: 2048, dynamic: true})
    const embed = {
	    title: 'Аватар',
	    description: `**Юзер:** ${user.tag}`,
      color: "#083ebe",
      image: {
        url: avatar
      }
	  }
		await interaction.reply({embeds: [embed]});
	},
};