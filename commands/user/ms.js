const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ms')
		.setDescription('a')
    .addIntegerOption(option => option.setName('int').setDescription('Укажите ms').setRequired(true)),
	async execute(interaction, client) {
    let int = interaction.options.getInteger('int')
    let weeks = Math.floor(int / 604800000)
    let days = Math.floor(int / 86400000) % 7
    let hours = Math.floor(int / 3600000) % 24;
    let minutes = Math.floor(int / 60000) % 60;
    let seconds = Math.floor(int / 1000) % 60;
    let up;
    if (weeks == 0 && days == 0 && hours == 0 && minutes == 0) up = `${seconds}с`
    else if (weeks == 0 && days == 0 && hours == 0) up = `${minutes}м ${seconds}с`
    else if (weeks == 0 && days == 0) up = `${hours}ч ${minutes}м ${seconds}с`
    else if (weeks == 0) up = `${days}д ${hours}ч ${minutes}м ${seconds}с`
    else up = `${weeks}н ${days}д ${hours}ч ${minutes}м ${seconds}с`
    const embed = {
	    title: 'Конвертация из ms',
	    description: `\`${up}\``,
      color: "#083ebe"
	  }
		await interaction.reply({embeds: [embed]});
	},
};