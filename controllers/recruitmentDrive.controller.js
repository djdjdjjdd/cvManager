const RecruitmentDrive = require('./recruitmentDrive.controller')
module.exports.create = async (req, res) => {
    try {
        const { recruitmentDriveCode, name, content } = req.body
        const newRecruitmentDrive = new RecruitmentDrive({
            recruitmentDriveCode, name, content
        })
        const savedRecruitmentDrive = await newRecruitmentDrive.save();
        res.status(201).json(savedRecruitmentDrive);
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
        const recruiment = await RecruitmentDrive.findOne({
            _id: id,
            deleted: false
        });
        res.json(recruiment)
    } catch (error) {
        res.json("khong tim thay")
    }
}
module.exports.delete = async (req, res) => {
    try {
        const recruimentId = req.params.id;
        const deletedRecruitmentDrive = await RecruitmentDrive.findByIdAndDelete(recruimentId)
        if (!deletedRecruitmentDrive) {
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
        await RecruitmentDrive.updateOne({ _id: id }, req.body)
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