const express = require("express")

const personController = require('./../controller/personController')

const router = express.Router()


router
  .route('/')
  .get(personController.getAllPerson)
  .post(personController.createPerson)

router
  .route('/:id')
  .get(personController.getPerson)
  .put(personController.updatePerson)
  .delete(personController.deletePerson)


module.exports = router