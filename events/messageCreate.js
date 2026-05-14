const Profile =
require("../models/profileSchema");

const EMOJI =
"<:3636:1504588328119439471>";

const STAFF_ROLE_ID =
"1501714428729491506";

function formatRauMa(points) {

    if (points >= 1000000) {
        return `${points / 1000000} tấn rau má`;
    }

    if (points >= 100000) {
        return `${points / 100000} tạ rau má`;
    }

    if (points >= 10000) {
        return `${points / 10000} tá rau má`;
    }

    if (points >= 1000) {
        return `${points / 1000} ký rau má`;
    }

    return `${points} lá rau má`;
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

    return Math.floor(
        parseFloat(amount)
    );
}

module.exports = async (
    client,
    message
) => {

    console.log(message.content);

    if (message.author.bot) return;

    // ====================
    // ADD POINTS
    // r60k @user
    // ====================

    if (
        message.content.startsWith("r") &&
        !message.content.startsWith("rr") &&
        !message.content.startsWith("rcheck")
    ) {

        const args =
        message.content.split(" ");

        const amount =
        parseAmount(
            args[0].replace("r", "")
        );

        const user =
        message.mentions.users.first();

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
                "-# Chỉ staff mới được phát rau má."
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

        await profile.save();

        return message.reply({

            content:
            `-# ${user} Đã được ban cho **${formatRauMa(amount)}** ${EMOJI}`
        });
    }

    // ====================
    // REMOVE POINTS
    // rr60k @user
    // ====================

    if (
        message.content.startsWith("rr")
    ) {

        const args =
        message.content.split(" ");

        const amount =
        parseAmount(
            args[0].replace("rr", "")
        );

        const user =
        message.mentions.users.first();

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
                "-# Chỉ staff mới được trộm rau má."
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

        return message.reply({

            content:
            `-# ${user} vừa bị lấy đi **${formatRauMa(amount)}** ${EMOJI}`
        });
    }

    // ====================
    // CHECK POINTS
    // rcheck
    // ====================

    if (
        message.content.startsWith("rcheck")
    ) {

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

        // staff check public
        if (
            message.mentions.users.first()
        ) {

            return message.reply({

                content:
                `-# ${target.username} hiện có **${formatRauMa(profile.points)}** ${EMOJI}`
            });
        }

        // self check
        const reply =
        await message.reply({

            content:
            `-# Bạn hiện có **${formatRauMa(profile.points)}** ${EMOJI}`
        });

    }
};