const Profile =
require("../models/profileSchema");

const STAFF_ROLE_ID =
"1501714428729491506";

const EMOJI =
"<:rauma:1503177577643118804>";

const sendLog =
require("../utils/sendLog");

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
            "rmall "
        )
    ) return;

    const isStaff =
    message.member.roles.cache.has(
        STAFF_ROLE_ID
    );

    if (!isStaff) {

        return message.reply({

            content:
            "Bạn không có quyền."
        });
    }

    const args =
    message.content.split(" ");

    const amount =
    parseAmount(args[1]);

    if (!amount) {

        return message.reply({

            content:
            "Số lượng không hợp lệ."
        });
    }

    const profiles =
    await Profile.find({

        guildId:
        message.guild.id
    });

    for (
        const profile
        of profiles
    ) {

        profile.points += amount;

        profile.totalEarned += amount;

        await profile.save();
    }

    await sendLog(

        client,

        `${EMOJI} THƯỞNG TOÀN SERVER`,

        `Người thực hiện:
${message.author}

Số lượng:
${amount.toLocaleString("vi-VN")} lá rau má

Số người nhận:
${profiles.length}`
    );

    return message.reply({

        content:
        `Đã phát ${amount.toLocaleString("vi-VN")} lá rau má cho toàn server ${EMOJI}`
    });
};