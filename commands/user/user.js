const { SlashCommandBuilder } = require('@discordjs/builders');
const strftime = require("strftime")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('То что все делалось по туториалу все отменяет!')
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
    let avatar = user.avatarURL({size: 2048, dynamic: true})
    let status = {
        online: 'В сети',
        idle: 'Нет на месте',
        dnd: 'Не беспокоить',
        offline: 'Не в сети'
    }
    let bot = {
        "true": "да",
        "false": "нет"
    }

    let day = 1000 * 60 * 60 * 24
    let date1 = new Date(interaction.createdTimestamp)
    let date2 = new Date(user.createdTimestamp)
    let date3 = new Date(member.joinedTimestamp)
    let diff1 = Math.round(Math.abs((date1.getTime() - date2.getTime()) / day))
    let diff2 = Math.round(Math.abs((date1.getTime() - date3.getTime()) / day))

    let game 
    if (!user.bot) {
      if (!member.presence.activities[0]) game = `${status[member.presence.status]}`
      else if (member.presence.activities[0].type == 'PLAYING') game = `Играет в ${member.presence.activities[0].name}`
      else if (member.presence.activities[0].type == 'STREAMING') game = `Стримит [${member.presence.activities[0].name}](${member.presence.activities[0].url})`
      else if (member.presence.activities[0].type == 'LISTENING') game = `Слушает **${member.presence.activities[0].name}**\n:headphones: ${member.presence.activities[0].state} - ${member.presence.activities[0].details}`
      else if (member.presence.activities[0].type == 'WATCHING') game = `Смотрит **${member.presence.activities[0].name}\n${member.presence.activities[0].state} - ${member.presence.activities[0].details}**`
      else if (member.presence.activities[0]) game = `${status[member.presence.status]}`
    } else {
      if (!member.presence.activities[0]) game = `${status[member.presence.status]}`
      else if (member.presence.activities[0].type == 'PLAYING') game = `Играет в ${member.presence.activities[0].name}`
      else if (member.presence.activities[0].type == 'STREAMING') game = `Стримит [${member.presence.activities[0].name}](${member.presence.activities[0].url})`
      else if (member.presence.activities[0].type == 'LISTENING') game = `Слушает **${member.presence.activities[0].name}**`
      else if (member.presence.activities[0].type == 'WATCHING') game = `Смотрит **${member.presence.activities[0].name}**`
      else if (member.presence.activities[0]) game = `${status[member.presence.status]}`
    }
    
    let embed = {
      title: "Юзеринфо",
      description: `**Юзер:** ${user.tag}`,
      color: "#083ebe",
      thumbnail: { url: avatar },
      fields: [
        {name: 'Основное', value: `**Бот:** ${bot[user.bot]}\n**Cтатус:** ${game}`},
        {name: 'Даты', value: `**Дата регистрации:** ${strftime('%d.%m.%Y в %H:%M:%S', new Date(user.createdTimestamp))} (${diff1} дн. назад)\n**Дата вступления:** ${strftime('%d.%m.%Y в %H:%M:%S', new Date(member.joinedTimestamp))} (${diff2} дн. назад)`}
      ],
      footer: {
        text: `ID: ${user.id}`
      }
    }
    interaction.reply({embeds: [embed]})
	},
};