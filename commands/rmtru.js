const Profile =
require("../models/profileSchema");

const EMOJI =
"<:rauma:1503177577643118804>";

const STAFF_ROLE_ID =
"1501714428729491506";

function formatRauMa(points) {

    return `${points.toLocaleString("vi-VN")} lá rau má`;
}

function parseAmount(amount) {

    amount =
    amount.toLowerCase();

    if (amount.endsWith("k")) {

        return Math.floor(
            parseFloat(amount) * 1000
        );
    }

    if (amount.endsWith("m")) {

        return Math.floor(
            parseFloat(amount) * 1000000
        );
    }

    if (amount.endsWith("b")) {

        return Math.floor(
            parseFloat(amount) * 1000000000
        );
    }

    return Math.floor(
        parseFloat(amount)
    );
}

module.exports = async (
    client,
    message
) => {

    if (
        !message.content.startsWith("rmtru ")
    ) return;

    const args =
    message.content.split(" ");

    const user =
    message.mentions.users.first();

    const amount =
    parseAmount(args[2]);

    if (
        !amount ||
        !user
    ) return;

    const isStaff =
    message.member.roles.cache.has(
        STAFF_ROLE_ID
    );

    if (!isStaff) {

        return message.reply({

            content:
            "Chỉ staff mới được trộm rau má."
        });
    }

    let profile =
    await Profile.findOne({

        userId: user.id,
        guildId: message.guild.id
    });

    if (!profile) return;

    profile.points -= amount;

    if (profile.points < 0) {

        profile.points = 0;
    }

    await profile.save();
        await sendLog(
    
        client,
    
        `${EMOJI} ĂN CẮP RAU MÁ`,
    
        `Kẻ lấy:
    ${message.author}
    Nạn nhân:
    ${user}
    
    Số lượng:
    ${formatRauMa(amount)} ${EMOJI}`
    );

    return message.reply({

        content:
        `${user} vừa bị lấy đi **${formatRauMa(amount)}** ${EMOJI}`
    });
};