const express = require("express");
const router = express.Router();
const controller = require('../controllers/user.controller')
router.post('/add', controller.addUserAdmin)
router.put('/update', controller.updateUserAdmin)
router.delete('/delete', controller.deleteUserAdmin)
router.put('/config', controller.systemConfigAdmin)
router.post('./viewcv', controller.viewCv)
router.get('./checkmanager', controller.checkManagerAccess.getAllCv)
module.exports = router