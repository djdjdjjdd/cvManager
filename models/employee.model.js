const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeCode: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    position: { type: String },
    directManager: { type: String },
    role: { type: String, required: true },
    deleted: {
        type: Boolean,
        default: false,
    },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;