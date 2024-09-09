const Task = require("../../models/task.model");
const paginationHelper = require("../helpers/pagination")
const searchHelper = require("../helpers/search")
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };
    if (req.query.status) {
        find.status = req.query.status
    }
    if (req.query.status) {
        find.status = req.query.status
    }
    let objectSearch = searchHelper(req.query)
    console.log(req.query)
    let initPagination = {
        currentPage: 1,
        limitItem: 4
    }
    const countTask = await Task.countDocuments(find)
    const objectPagination = paginationHelper(
        initPagination,
        req.query,
        countTask
    )
    const sort = []
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    }
    const tasks = await Task.find({

    });
    res.json(tasks)
};
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id
        const task = await Task.findOne({
            _id: id,
            deleted: false
        });
        res.json(task)
    } catch (error) {
        res.json("khong tim thay")
    }
}
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id
        const status = req.body.status
        await Task.updateOne({
            id: id,
        }, {
            status: status
        });
        res.json({
            code: 200,
            message: 'cap nhat trang thai thanh thcong'
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "không tồn tại"
        })
    }

}
module.exports.changeMulti = async (req, res) => {
    try {
        const { ids, key, value } = req.body;
        console.log(ids)
        console.log(key)
        console.log(value)
        switch (key) {
            case "status":
                await Task.updateMany({
                    _id: { $in: ids }
                }, {
                    status: value
                });
                res.json({
                    code: 200,
                    message: 'câp nhật trạng thái thành công'
                })
                break;
            default:
                break;
        }

    } catch (error) {
        res.json({
            code: 400,
            message: 'không tồn tại'
        })
    }
}
module.exports.create = async (req, res) => {
    try {
        const task = new Task(req.body)
        const data = await task.save()
        res.json({
            code: 200,
            message: "tao thanh cong",
            data: data
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
        await Task.updateOne({ _id: id }, req.body)
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

module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        await Task.updateOne({ _id: id }, {
            deleted: true,
            deleteAt: new Date()
        });
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