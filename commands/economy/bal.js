const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bal')
		.setDescription('Выдает баланс участника')
    .addUserOption(option => option.setName('target').setDescription('Select a user')),
	async execute(interaction, client) {
    let member = interaction.options.getMember('target');
    let user = interaction.options.getUser('target');
    if (member) {
      console.log(" ")
    } else {
      member = interaction.member
    }
    if (user) {
      console.log(" ")
    } else {
      user = interaction.user
    }
    let data = await User.findOne({ userID: user.id, guildID: interaction.guild.id  })
    let gdata = await Guild.findOne({ guildID: interaction.guild.id  })
    if (!data) interaction.reply("Юзер не найден в базе данных")
    if (!gdata) interaction.reply("Сервер не найден в базе данных")
    const embed = {
      title: "Баланс",
      description: `${data.money}$`,
      color: "#083ebe"
    }
    
    interaction.reply({embeds: [embed]})
	},
};