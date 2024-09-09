module.exports.checkAdminAccess = async (req, res, next) => {
    const userId = req.headers.userid; // Giả sử userId là id của người dùng
    const user = users.find(u => u.id === parseInt(userId));

    if (!user || user.role !== 'Admin') {
        return res.status(403).json({ message: 'Permission denied' });
    }

    next();
}