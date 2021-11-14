const { SlashCommandBuilder } = require('@discordjs/builders');
const weather = require('weather-js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weather')
		.setDescription('Выдает погоду из указанного города')
    .addStringOption(option => option.setName('town').setDescription('Укажите город').setRequired(true)),
	async execute(interaction, client) {
    const town = interaction.options.getString('town')
    weather.find({search: town, degreeType: 'C'}, async function(err, result) {
      try {
        let embed = {
          title: `Погода в городе ${result[0].location.name}.`,
          description: `Если у вас другие значения, смотрите на **время**.`,
          color: `#083ebe`,
          fields: [
            {name: "Температура", value:`${result[0].current.temperature} по цельсию`, inline: true},
            {name: "Текстура неба", value: `${result[0].current.skytext}`, inline: true},
            {name: "Влажность воздуха", value:`${result[0].current.humidity}`,inline: true},
            {name:"Скорость ветра", value:`${result[0].current.windspeed}`, inline: true},
            {name:"Время наблюдения за погодой", value:`${result[0].current.observationtime}`, inline:true}
          ],
          thumnail: {
            url: result[0].current.imageUrl
          }
        }
        await interaction.reply({embeds: [embed]});
      } catch(err) {
        interaction.reply(`А такой город вообще существует? >_<`)
      }
    })
  },
};