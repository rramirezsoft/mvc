const express = require("express")
const router = express.Router()
const uploadMiddlewareMemory = require("../utils/handleStorage")
const { createItem, getItems } = require('../controllers/storage')

router.get('/', getItems)
router.post('/', uploadMiddlewareMemory.single('image'), createItem)

module.exports = router