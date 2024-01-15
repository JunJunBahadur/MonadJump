const mongoose = require('mongoose');

const LeaderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    },
});

const User = mongoose.model('User', LeaderSchema);

module.exports = User;