require('dotenv').config()
const { buzzwords } = require('./buzzwordList.json')

const tmi = require("tmi.js");
const client = new tmi.Client({
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
            buzzwords.forEach(buzzWord => {
                if (message.toLowerCase().includes(buzzWord)) {
                    client.say(channel, `${tags.username} said the buzzword: ${buzzWord}`)
                }
            });
			break;
	    default:
			break;
	}


});
