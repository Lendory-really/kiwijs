module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
    client.user.setPresence({ activities: [{ name: 'крутыши всегда возвращаются.....', type: "LISTENING"}], status: 'idle' });
		console.log(`Запущено ${client.user.tag}`);
	},
};