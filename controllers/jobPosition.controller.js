const JobPosition = require('../models/jobPosition.model')
module.exports.create = async (req, res) => {
    try {
        const { positionCode, positionName, level } = req.body
        const newDepartment = new JobPosition({
            positionCode, positionName, level
        })
        const savedDepartment = await newDepartment.save();
        res.status(201).json(savedDepartment);
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
        const position = await JobPosition.findOne({
            _id: id,
            deleted: false
        });
        res.json(position)
    } catch (error) {
        res.json("khong tim thay")
    }
}
module.exports.delete = async (req, res) => {
    try {
        const departmentId = req.params.id;
        const deletedDepartment = await JobPosition.findByIdAndDelete(departmentId)
        if (!deletedDepartment) {
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
        await JobPosition.updateOne({ _id: id }, req.body)
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