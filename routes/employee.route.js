const express = require("express");
const router = express.Router();
const controller = require('../controllers/employee.controllers')
router.post('/create', controller.create)
router.post('/detail', controller.detail)
router.patch('/delete', controller.delete)
router.patch('/edit', controller.edit)
//router.put('/index', controller.index)

module.exports = router