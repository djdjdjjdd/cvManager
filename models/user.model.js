const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Manager', 'Member'],
        default: 'Member'
    },
    deleted: {
        type: Boolean,
        default: false
    },


    deletedBy: String,
})
const User = mongoose.model('Task', userSchema)
module.require = User