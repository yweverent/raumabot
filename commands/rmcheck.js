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
        !message.content.startsWith("rmcheck")
    ) return;

    const target =
    message.mentions.users.first()
    || message.author;

    let profile =
    await Profile.findOne({

        userId: target.id,
        guildId: message.guild.id
    });

    if (!profile) {

        profile =
        await Profile.create({

            userId: target.id,
            guildId: message.guild.id,

            points: 0
        });
    }

    if (
        message.mentions.users.first()
    ) {

        return message.reply({

            content:
            `**${
    message.guild.members.cache.get(
        target.id
    )?.displayName

    || target.username
}** hiện có **${formatRauMa(profile.points)}** ${EMOJI}`
        });
    }

    return message.reply({

        content:
        `Bạn hiện có **${formatRauMa(profile.points)}** ${EMOJI}`
    });
};