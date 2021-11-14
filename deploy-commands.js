const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = process.env.TOKEN
const { clientId, guildId } = require('./config.json');

const commands = [];

fs.readdirSync("./commands/").forEach(dir => {
  const commandsFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"))
  for (const file of commandsFiles) {
	  const command = require(`./commands/${dir}/${file}`);
	  commands.push(command.data.toJSON());
  }
});

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);