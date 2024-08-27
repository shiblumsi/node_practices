const express = require("express")
const userController = require('./../controller/userController')
const router = express.Router()

router
  .route('/')
  .post(userController.createUser)
  .get(userController.getAllUsers)

router
  .route('/:id')
  .get(userController.getSingleUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser)

module.exports = router