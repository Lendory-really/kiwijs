const { SlashCommandBuilder } = require('@discordjs/builders');
const ms = require('pretty-ms');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('work')
		.setDescription('Получение денег'),
	async execute(interaction, client) {
    let data = await User.findOne({ userID: interaction.user.id, guildID: interaction.guild.id })
    if(data.workcd+600000>Date.now()){
      let cdembed = {
        title: "⌛ Задержка",
        description: `Пожалуйста подождите \`${ms(600000-(Date.now()-data.workcd))}\``,
        color: "fc0000"
      }
      await interaction.reply({embeds: [cdembed]});
    } else {
      let money = Math.floor((Math.random() * 900)) 
      const embed = {
        title: 'Успешно',
        description: `Вы поработали и получили ${money}$`,
        color: "#083ebe"
      }
      data.workcd = Date.now()
      data.money += money
      data.save()
      await interaction.reply({embeds: [embed]});
    }
  },
};