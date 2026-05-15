const Profile =
require("../models/profileSchema");

const EMOJI =
"<:rauma:1503177577643118804>";

const CORE_TEAM_ROLE_ID =
"1502857129445425172";

const sendLog =
require("../utils/sendLog");

module.exports = async (
    client,
    message
) => {

    if (
        message.content !== "rmresetall"
    ) return;

    const isStaff =
    message.member.roles.cache.has(
        CORE_TEAM_ROLE_ID
    );

    if (!isStaff) {

        return message.reply({

            content:
            "Bạn không có quyền dùng lệnh này."
        });
    }

    await Profile.updateMany(

        {
            guildId: message.guild.id
        },

        {
            $set: {
                points: 0
            }
        }
    );

    await sendLog(

    client,

    `${EMOJI} RESET TOÀN BỘ`,

    `Thực hiện bởi:
${message.author}`
);

    return message.reply({

        content:
        `Đã reset toàn bộ rau má trong server ${EMOJI}`
    });
};