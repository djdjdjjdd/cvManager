const Activity = require('../models/activity.model')
module.exports.create = async (req, res) => {
    try {
        const { activityType, user, activityNote } = req.body
        const newActivity = new Activity({
            activityType, user, activityNote
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
        const activity = await Activity.findOne({
            _id: id,
            deleted: false
        });
        res.json(activity)
    } catch (error) {
        res.json("khong tim thay")
    }
}
module.exports.delete = async (req, res) => {
    try {
        const activityId = req.params.id;
        const deletedActivity = await Activity.findByIdAndDelete(activityId)
        if (!deletedActivity) {
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
        await Activity.updateOne({ _id: id }, req.body)
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

    const activity = await Activity
        .find(find)
        .limit(limitItems)
        .skip(skip)
        .sort(sort);

    res.json(department);
}
// module.exports.fillterActivity = async (req, res) => {
//     const { activityType, createDate, user } = req.params
//     let filltersActivity = activities
//     if (activityType) {
//         filltersActivity = filltersActivity.filter(activity => activity.activity_Type === activityType)
//     }
//     if (createDate) {
//         filltersActivity = filltersActivity.filter(activity => activity.create_Date === createDate)
//     }
//     if (user) {
//         filltersActivity = filltersActivity.filter(activity => activity.user_Id === user)
//     }
//     res.json({ filltersActivity })
// }