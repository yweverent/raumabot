const Profile =
require("../models/profileSchema");

module.exports = async (
    client,
    interaction
) => {

    if (
        !interaction.isChatInputCommand()
    ) return;

    let profile =
    await Profile.findOne({

        userId: interaction.user.id,
        guildId: interaction.guild.id
    });

    if (!profile) {

        profile =
        await Profile.create({

            userId: interaction.user.id,
            guildId: interaction.guild.id,

            points: 0
        });
    }

    const command =
    client.commands.get(
        interaction.commandName
    );

    if (!command) return;

    try {

        await command.execute(
            interaction,
            profile,
            client
        );

    } catch (err) {

        console.log(err);
    }
};