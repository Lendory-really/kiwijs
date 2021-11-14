console.log("NodeJS Version: " + process.version)
const token = process.env.TOKEN
const fs = require("fs")
const express = require('express');

const server = express();
server.all('/', (req, res) => {
  res.send(`OK`)
})
function keepAlive() {
  server.listen(3000, () => { console.log("Server is Ready!!" + Date.now()) });
}
module.exports = keepAlive;
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();

fs.readdirSync("./commands/").forEach(dir => {
  const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"))
  for (const file of commands) {
	  const command = require(`./commands/${dir}/${file}`);
	  client.commands.set(command.data.name, command);
    console.log(`Файл ${dir}/${file} успешно загружен `)
  }
});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

require('child_process').execSync("node deploy-commands.js").toString('utf8')


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction, client);
	} catch (error) {
		const embed = {
          title: "Так, так, так...",
          description: `\`\`\`Обнаружена ошибка:\n${error.name}: ${error.message}\`\`\``,
          color: "#fc0000",
          footer: {
            text: "Советую обратиться к разработчикам бота для исправления данной ошибки"
          }
        }
        interaction.reply({embeds: [embed]})
	}
});

client.login(token)
