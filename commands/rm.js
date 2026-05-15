const Profile =
require("../models/profileSchema");

const EMOJI =
"<:rauma:1503177577643118804>";

const STAFF_ROLE_ID =
"1501714428729491506";

const sendLog =
require("../utils/sendLog");

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
        !message.content.startsWith("rm ")
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
            "Chỉ staff mới được phát rau má."
        });
    }

    let profile =
    await Profile.findOne({

        userId: user.id,
        guildId: message.guild.id
    });

    if (!profile) {

        profile =
        await Profile.create({

            userId: user.id,
            guildId: message.guild.id,

            points: 0
        });
    }

    profile.points += amount;
    profile.totalEarned += amount;

    await profile.save();
    await sendLog(

    client,

    `${EMOJI} THƯỞNG RAU MÁ`,

    `Staff:
${message.author}
Khách hàng:
${user}

Số lượng:
${formatRauMa(amount)} ${EMOJI}`
);

    return message.reply({

        content:
        `${user} đã được ban cho **${formatRauMa(amount)}** ${EMOJI}`
    });
};