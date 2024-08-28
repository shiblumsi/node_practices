const express = require("express")
const userController = require('./../controller/userController')
const router = express.Router()
const authController = require("./../controller/authController")
router
  .route('/')
  .post(userController.createUser)
  .get(authController.protected, userController.getAllUsers)

router
  .route('/:id')
  .get(userController.getSingleUser)
  .put(userController.updateUser)
  .delete(authController.protected,authController.restrictTo('admin'),userController.deleteUser)

module.exports = router