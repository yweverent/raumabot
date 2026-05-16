module.exports = async (
    client,
    message
) => {

    if (message.author.bot) return;

    const commands = [

        require("../commands/rm"),
        require("../commands/rmtru"),
        require("../commands/rmcheck"),
        require("../commands/rmrank"),
        require("../commands/rmresetall"),
        require("../commands/rmset"),
        require("../commands/rmredeem"),
        require("../commands/rmrewards"),
        require("../commands/rmprofile"),
    ];

    for (const command of commands) {

        await command(
            client,
            message
        );
    }
};