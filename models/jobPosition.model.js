const mongoose = require('mongoose');

const jobPositionSchema = new mongoose.Schema({
    positionCode: {
        type: String,
        required: true,
        unique: true
    },
    positionName: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['Inter', 'Fresher', 'Junior', 'Mid', 'Senior', 'Leader', 'Manager', 'Director'],
        default: 'Fresher' // Giá trị mặc định là 'Fresher' nếu không được chỉ định
    },
    deleted: {
        type: Boolean,
        default: false,
    },
});

const JobPosition = mongoose.model('JobPosition', jobPositionSchema);

module.exports = JobPosition;