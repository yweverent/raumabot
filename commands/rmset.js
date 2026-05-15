const Profile =
require("../models/profileSchema");

const sendLog =
require("../utils/sendLog");

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
        !message.content.startsWith(
            "rmset "
        )
    ) return;

    const args =
    message.content.split(" ");

    const user =
    message.mentions.users.first();

    const amount =
    parseAmount(args[2]);

    if (
        !user ||
        !amount
    ) return;

    const isStaff =
    message.member.roles.cache.has(
        STAFF_ROLE_ID
    );

    if (!isStaff) {

        return message.reply({

            content:
            "Chỉ staff mới được dùng lệnh này."
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

    profile.points = amount;

    await profile.save();

    await sendLog(

        client,

        `${EMOJI} SET RAU MÁ`,

        `Người thực hiện:
${message.author}

Khách hàng:
${user}

Set thành:
${formatRauMa(amount)}`
    );

    return message.reply({

        content:
        `Điểm tích lũy của ${user} đã được set thành **${formatRauMa(amount)}** ${EMOJI}`
    });
};