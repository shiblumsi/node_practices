const express = require("express")
const postController = require('./../controller/postController')
router = express.Router()


router
  .route('/')
  .post(postController.createPost)


module.exports = router