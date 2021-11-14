const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Выдает все команды бота'),
	async execute(interaction, client) {
    const embed = {
      title: "Хелп",
      fields: [
        {name: "Информация", value: `\`weather, help, ms\``, inline: false},
        {name: "API", value: `\`bear, panda, cat, dog\``, inline: false},
        {name: "Изменение картинки", value: `\`blueify, darken, purplify, invert, darken, snow\``, inline: false},
        {name: "Юзер-инфо команды", value: `\`user, avatar\``, inline: false},
        {name: "Бот-инфо команды", value: `\`ping, stats\``, inline: false},
        {name: "Команды разработчика", value: `\`eval\``, inline: false}
      ],
      color: "#083ebe",
      description: "Все команды являются слэшами"
    }
		await interaction.reply({embeds: [embed]});
	},
};