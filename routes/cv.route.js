const express = require("express");
const router = express.Router();
const controller = require('../controllers/activity.controller')
router.post('/create', controller.create)
router.patch('/detail', controller.detail)
router.patch('/delete', controller.delete)
router.post('/edit', controller.edit)
router.put('/index', controller.index)
//router.put('/fillterActivity', controller.fillterActivity)
module.exports = router