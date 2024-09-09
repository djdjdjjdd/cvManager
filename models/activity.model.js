const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    activityType: {
        type: String,
        required: true
    },
    activityNote: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    share: {
        type: Boolean,
        default: false
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});

// Tạo model từ schema
const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;