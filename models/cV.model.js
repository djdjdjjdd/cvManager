const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho CV
const cvSchema = new Schema({
    CV_ID: {
        type: String,
        required: true
    },
    APPLY_DATETIME: {
        type: Date,
        default: Date.now
    },
    FULL_NAME: {
        type: String,
        required: true
    },
    GENDER: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    EMAIL: {
        type: String,
        required: true
    },
    TEL: {
        type: String
    },
    City: {
        type: String
    },
    Job_name: {
        type: String
    },
    Total_Experience: {
        type: Number
    },
    Note: {
        type: String
    },
    Link_CV: {
        type: String
    },
    Recruitment_Source: {
        type: String
    },
    Status: {
        type: String,
        enum: ['Chưa pvận', 'Pass pvận', 'Fail pvận', 'Đăng cân nhắc sau pvận', 'Nghỉ việc', 'Bị thôi việc']
    },
    Share: {
        type: Boolean,
        default: false
    },
    Hr_user: {
        type: String
    }
});

// Tạo model từ schema
const CV = mongoose.model('CV', cvSchema);

module.exports = CV;