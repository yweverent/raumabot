const {
    SlashCommandBuilder
} = require("discord.js");

const EMOJI =
"<:3636:1504588328119439471>";

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

module.exports = {

    data: new SlashCommandBuilder()

        .setName("points")
        .setDescription(
            "Xem rau má tích lũy"
        ),

    async execute(
        interaction,
        profile
    ) {

        await interaction.reply({

            content:
            `${EMOJI} Bạn hiện có ${formatRauMa(profile.points)}`,

            ephemeral: true
        });
    }
};