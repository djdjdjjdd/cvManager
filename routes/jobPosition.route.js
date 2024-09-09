const express = require("express");
const router = express.Router();
const controller = require('../controllers/jobPosition.controller')
router.post('/create', controller.create)
router.post('/detail', controller.detail)
router.post('/delete', controller.delete)
router.post('/edit', controller.edit)
router.put('/index', controller.index)

module.exports = router