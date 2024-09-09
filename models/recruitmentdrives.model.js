const mongoose = require('mongoose');

const recruitmentDriveSchema = new mongoose.Schema({
    recruitmentDriveCode: { type: String, required: true },
    name: { type: String, required: true },
    content: { type: String },
    deadline: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const RecruitmentDrive = mongoose.model('RecruitmentDrive', recruitmentDriveSchema);

module.exports = RecruitmentDrive;