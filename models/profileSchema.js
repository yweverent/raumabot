const mongoose = require("mongoose");

const profileSchema =
new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },

    guildId: {
        type: String,
        required: true
    },

    points: {
        type: Number,
        default: 0
    }
});

module.exports =
mongoose.model(
    "Profile",
    profileSchema
);