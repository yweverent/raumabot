const Profile =
require("../models/profileSchema");

const EMOJI =
"<:rauma:1503177577643118804>";

function formatRauMa(points) {

    return `${points.toLocaleString("vi-VN")} lá rau má`;
}

module.exports = async (
    client,
    message
) => {

    if (
        message.content !== "rmrank"
    ) return;

    const profiles =
    await Profile.find({

        guildId: message.guild.id,
        points: { $gt: 0 }
    })

    .sort({
        points: -1
    })

    .limit(10);

    if (!profiles.length) {

        return message.reply({

            content:
            `Chưa có ai có rau má ${EMOJI}`
        });
    }

    let description = "";

    for (
        let i = 0;
        i < profiles.length;
        i++
    ) {

        const profile =
        profiles[i];

        const user =
        await client.users.fetch(
            profile.userId
        )

        .catch(() => null);

        let medal = "";

        if (i === 0) medal = "<:emoji_239:1502448425659138129>";
        if (i === 1) medal = "<:emoji_239:1502448428528173057>";
        if (i === 2) medal = "<:emoji_37:1502448447880695818>";

        description +=
        `${medal} **#${i + 1}** • ${
            user
            ? user.username
            : "Unknown User"
        }\n`;

        description +=
        `${EMOJI} ${formatRauMa(profile.points)}\n\n`;
    }

    const {
        EmbedBuilder
    } = require("discord.js");

    const embed =
    new EmbedBuilder()

    .setColor("#ffffff")

    .setTitle(
        `Top Đại gia Rau má ${EMOJI}`
    )

    .setDescription(
        description
    )

    .setFooter({

        text:
        "Nem chua Thanh Hóa"
    })

    .setTimestamp();

    return message.reply({

        embeds: [embed]
    });
};