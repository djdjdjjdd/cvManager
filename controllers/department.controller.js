const Department = require('../models/department.model')
const searchHelper = require("../helpers/search")
const paginationHelper = require("../helpers/pagination")
module.exports.create = async (req, res) => {
    try {
        const { departmentCode, name, description } = req.body
        const newDepartment = new Department({
            departmentCode, name, description
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
        const department = await Department.findOne({
            _id: id,
            deleted: false
        });
        res.json(department)
    } catch (error) {
        res.json("khong tim thay")
    }
}
module.exports.delete = async (req, res) => {
    try {
        const departmentId = req.params.id;
        const deletedDepartment = await Department.findByIdAndDelete(departmentId)
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
        await Department.updateOne({ _id: id }, req.body)
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
module.exports.index = async (req, res) => {
    const find = {
        $or: [
            { createdBy: req.user.id },
            { listUser: req.user.id }
        ],
        deleted: false
    };

    // Lọc theo trạng thái
    const status = req.query.status;

    if (status) {
        find.status = status;
    }
    // Hết Lọc theo trạng thái

    // Tìm kiếm
    if (req.query.keyword) {
        const regex = new RegExp(req.query.keyword, "i");
        find.title = regex;
    }
    // Hết Tìm kiếm

    // Sắp xếp
    const sort = {};

    const sortKey = req.query.sortKey;
    const sortValue = req.query.sortValue;

    if (sortKey && sortValue) {
        sort[sortKey] = sortValue;
    }
    // Hết Sắp xếp

    // Phân trang
    let limitItems = 2;
    if (req.query.limitItems) {
        limitItems = parseInt(req.query.limitItems);
    }

    let page = 1;
    if (req.query.page) {
        page = parseInt(req.query.page);
    }

    const skip = (page - 1) * limitItems;
    // Hết Phân trang

    const department = await Department
        .find(find)
        .limit(limitItems)
        .skip(skip)
        .sort(sort);

    res.json(department);
}