const mongoose =
require("mongoose");

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

    customerRank: {

        type: String,
        default: "Chưa có"
    }

    points: {

        type: Number,
        default: 0
    },

    totalEarned: {

        type: Number,
        default: 0
    },

    redeemedRewards: {

        type: Array,
        default: []
    },

});

module.exports =
mongoose.model(
    "Profile",
    profileSchema
);