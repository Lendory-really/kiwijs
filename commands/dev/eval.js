const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('eval')
		.setDescription('Выполняет указаный код')
    .addStringOption(option => option.setName('code').setDescription('Укажите код').setRequired(true)),
	async execute(interaction,client) {
    if (interaction.user.id != "731197274130219101") {
      await interaction.reply(` Вы не разработчик данного бота, ведь разработчиком даного бота является разработчик данного бота!`)
    } else {
      try {
      const embed = {
        title: "Евал",
        description: `\`\`\`${eval(interaction.options.getString('code'))}\`\`\``,
        color: "#083ebe"
      }
interaction.reply({embeds: [embed]})
      } catch (error) {
        const embed = {
          title: "Так, так, так...",
          description: `\`\`\`Обнаружена ошибка:\n${error.name}: ${error.message}\`\`\``,
          color: "#fc0000"
        }
        interaction.reply({embeds: [embed]})
      }
    }
    }
	};
