
const mongoose = require('mongoose');

const friendreqSchema = new mongoose.Schema({
    from: {
        type: String
    },
    to: {
        type: String
    },
    requsted: {
        type: Boolean,
        default: false
    },
    accepted: {
        type: Boolean,
        default: false
    },
    date: {
        type:Date,
        default: Date.now
    }
});

const Friend = mongoose.model('Friends', friendreqSchema);

exports.Friend = Friend;