const {
    EmbedBuilder
} = require("discord.js");

const LOG_CHANNEL_ID =
"1501634643882151997";

module.exports = async (

    client,
    title,
    description
) => {

    const channel =

    client.channels.cache.get(
        LOG_CHANNEL_ID
    );

    if (!channel) return;

    const embed =
    new EmbedBuilder()

    .setColor("#d9eed6")

    .setTitle(title)

    .setDescription(
        description
    )

    .setTimestamp();

    channel.send({

        embeds: [embed]
    });
};