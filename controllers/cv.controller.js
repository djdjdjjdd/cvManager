const CV = require('../models/cV.model')
module.exports.changeStatus = async (req, res) => {
    try {

        const ids = req.body.ids
        const status = req.body.status
        await CV.updateMany({
            _id: { $in: ids }
        }, {
            status: status
        });

        res.json({
            message: "Cập nhật dữ liệu thành công!"
        });

    } catch (error) {
        res.json({ message: 'bị lỗi' })
    }

}
module.exports.create = async (req, res) => {
    try {
        const { CV_ID, APPLY_DATETIME, EMAIL } = req.body
        const newActivity = new CV({
            CV_ID, APPLY_DATETIME, EMAIL
        })
        const savedActivity = await newActivity.save();
        res.status(201).json(savedActivity);
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
        const cv = await CV.findOne({
            _id: id,
            deleted: false
        });
        res.json(cv)
    } catch (error) {
        res.json("khong tim thay")
    }
}
module.exports.delete = async (req, res) => {
    try {
        const cvId = req.params.id;
        const deletedCv = await CV.findByIdAndDelete(cvId)
        if (!deletedCv) {
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
        await CV.updateOne({ _id: id }, req.body)
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