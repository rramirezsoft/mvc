const express = require("express")
const router = express.Router()
const { getUsers, getUser, updateUser, deleteUser } = require("../controllers/users")
const { validatorUpdateUser, validatorGetUser } = require("../validators/users")
const authMiddleware = require("../middleware/session")
const checkRol = require("../middleware/rol")

router.get("/", authMiddleware, getUsers)
router.get("/:id", authMiddleware, validatorGetUser, getUser)
router.patch("/:id", authMiddleware, checkRol(['admin']), validatorUpdateUser, updateUser)
router.delete("/:id", authMiddleware, checkRol(['admin']), validatorGetUser, deleteUser)

module.exports = router