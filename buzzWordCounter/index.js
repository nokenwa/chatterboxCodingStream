require('dotenv').config()
const { buzzwords } = require('./buzzwordList.json')

const tmi = require("tmi.js");
const client = new tmi.Client({
	options: {debug: true},
	connection: {
		reconnect: true,
		secure: true,
	},
	identity: {
		username: "chatterbotcoder",
		password: process.env.TWITCH_ACCESS_TOKEN,
	},
	channels: ["chatterboxcoder"],
});
client.connect().catch(console.error);

//TMI BOT
client.on("message", async (channel, tags, message, self) => {
	if (self) return;

	switch (tags["message-type"]) {
		case "chat":
			const words = [];
            buzzwords.forEach(buzzWord => {
				if (message.toLowerCase().includes(buzzWord)) {
					words.push(buzzWord);
					console.log(`buzzword ${buzzWord} found`)
					console.log(words)
				}
			});
			if (words.length) {
				client.say(channel, `${tags.username} said the buzzwords: ${words.join(', ')}`)	
				console.log(`${tags.username} said the buzzwords: ${words.join(', ')}`)
			}
			break;
	    default:
			break;
	}
});
