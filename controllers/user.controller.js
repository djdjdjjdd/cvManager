const cryptoJS = require("crypto-js");
const puppeteer = require('puppeteer');
const User = require("../models/user.model");
const CV = require("../models/cvData.model")
const AuthenticateToken = require('../middleware/auth.middleware')
const SystemConfig = require('../models/systemconfig.model');
const checkAdminAccess = require('../middleware/checkAdmin.middleware')
// admin
module.exports.AuthenticateToken.addUserAdmin = (req, res) => {
    try {
        const data = req.data
        if (req.user.role !== "Admin") {
            return res.status(404).json({ message: 'quyền bị từ chối' })
        }
        data.id = cryptoJS.createHmac('sha1', 'example')
            .update('12345')
            .digest('hex')
        res.status(403).json({ message: 'thêm người dùng thành công' })
    } catch (error) {
        res.status(500).json({ message: 'bị lỗi' })
    }
}

module.exports.AuthenticateToken.updateUserAdmin = async (req, res) => {
    try {
        const data = req.body
        const { userId } = req.params.id
        const user = await User.findById(userId);
        data.user.role = role
        if (req.user.role !== "Admin") {
            return res.status(404).json({ message: 'quyền bị từ chối' })
        }
        const updateUser = await User.save();
        res.json(updateUser)
    } catch (error) {
        res.json({ message: 'error' })
    }
}
module.exports.AuthenticateToken.deleteUserAdmin = async (req, res) => {


    if (req.user.role == 'Admin') {
        const id = req.params.id
        await User.updateOne({
            _id: id
        }, {
            deleted: true,
            deletedBy: res.id
        })
        res.json({
            code: 200,
            message: "xóa sản phẩm thành công"
        })
    } else {
        res.json({ message: 'error' })
    }
}
module.exports.AuthenticateToken.systemConfigAdmin = async (req, res) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(403).json({ message: 'Permission denied' });
        }
        const configData = req.body
        const updatedConfig = await SystemConfig.findOneAndUpdate({}, configData, { new: true, upsert: true });
        await updatedConfig.save()
        if (updatedConfig) {
            res.json({ message: 'System configured successfully' })
        } else {
            res.status(500).json({ message: 'Failed to update system configuration' });
        }
    } catch {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while configuring system' });
    }
}

module.export.checkAdminAccess.viewCv = async (req, res) => {
    if (req.user && req.user.role === 'Admin') {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Navigate the page to a URL
        await page.goto('https://developer.chrome.com/');

        // Set screen size
        await page.setViewport({ width: 1080, height: 1024 });

        // Type into search box
        await page.type('.devsite-search-field', 'automate beyond recorder');

        // Wait and click on first result
        const searchResultSelector = '.devsite-result-item-link';
        await page.waitForSelector(searchResultSelector);
        await page.click(searchResultSelector);

        // Locate the full title with a unique string
        const textSelector = await page.waitForSelector(
            'text/Customize and automate'
        );
        const fullTitle = await textSelector?.evaluate(el => el.textContent);

        // Print the full title
        console.log('The title of this blog post is "%s".', fullTitle);

        await browser.close();
        next();
    } else {

        return res.status(403).json({ message: 'Permission denied' });
    }
}
// manager
const checkManagerAccess = (req, res, next) => {
    const userId = req.headers.userid; // Assume this is the user ID
    const user = users.find(u => u.id === parseInt(userId));

    if (!user || user.role !== 'Manager') {
        return res.status(403).json({ message: 'Permission denied' });
    }

    next();
};
checkManagerAccess.getAllCv = async (req, res) => {
    try {
        const allCVs = await getAllCVs()
        res.json({ allCVs })
    } catch {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
function getAllCVs() {

    return [{ id: 1, name: 'CV 1', owner: 'member1' }, { id: 2, name: 'CV 2', owner: 'member2' }];
}
module.exports = checkManagerAccess
//member
const checkMember = async (userId, cvId) => {
    try {
        const user = await User.findById(userId)
        const cv = await CV.findById(cvId)
        if (user || !cv) {
            return false;
        }
        if (user._id.equals(cv.owner) || cv.sharedWith.includes(user._id)) {
            return true;
        }
        return false;
    } catch {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const checkMemberSuccess = async (req, res) => {
    const memberId = req.headers.memberid
    const cvId = req.params.cvId;

    const hasAccess = await checkAccess(memberId, cvId);
    if (hasAccess) {

        res.json({ message: 'Viewing CV and Activity' });
    } else {
        res.status(403).json({ message: 'Permission denied' });
    }
}
module.exports = checkMemberSuccess