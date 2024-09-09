const mongoose = require('mongoose');

// Xây dựng schema cho phòng ban
const departmentSchema = new mongoose.Schema({
    departmentCode: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    parentDepartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    childDepartments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    }],
    deleted: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });

// Tạo model cho phòng ban từ schema
const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;