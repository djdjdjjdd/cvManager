const Employee = require('../models/employee.model')
module.exports.create = async (req, res) => {
    try {
        const { employeeCode, name, email } = req.body
        const newEmployee = new Employee({
            employeeCode, name, email
        })
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        res.json({
            code: 400,
            message: 'loi'
        })
    }
}
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id
        const employee = await Employee.findOne({
            _id: id,
            deleted: false
        });
        res.json(employee)
    } catch (error) {
        res.json("khong tim thay")
    }
}
module.exports.delete = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId)
        if (!deletedEmployee) {
            return res.status(404).json({ message: "Không tìm thấy phòng ban để xóa." })
        }
        res.json({
            code: 200,
            message: 'xoa thanh cong'
        })
    } catch (error) {
        res.json({
            code: 400,
            message: 'loi'
        })
    }
}
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id
        await Employee.updateOne({ _id: id }, req.body)
        res.json({
            code: 200,
            message: 'cap nhat thanh cong'
        })

    } catch (error) {
        res.json({
            code: 400,
            message: 'loi'
        })
    }
}