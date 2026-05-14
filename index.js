require("dotenv").config();

const {
    Client,
    GatewayIntentBits
} = require("discord.js");

const mongoose =
require("mongoose");

const client =
new Client({

    intents: [

        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

console.log("Bot starting...");

// mongodb
mongoose.connect(
    process.env.MONGODB_URI
)

.then(() => {

    console.log(
        "MongoDB connected"
    );

})

.catch((err) => {

    console.log(err);
});

// handlers
require("./handlers/commandHandler")(client);
require("./handlers/eventHandler")(client);

// login
client.login(
    process.env.DISCORD_TOKEN
);