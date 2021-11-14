const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('dog')
		.setDescription('Выдает рандомную картину собаки'),
	async execute(interaction, client) {
    let avatar;
    const url = 'https://no-api-key.com/api/v2/animals/dog';
    const { data } = await axios.get(url);
    avatar = data["image"];
      

    const embed = {
	    title: 'Какая милота!',
      color: "#083ebe",
      image: {
        url: avatar
      }
	  }
		await interaction.reply({embeds: [embed]});
	},
};