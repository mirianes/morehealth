const express = require('express')
const router = express.Router()

const userValidation = require('../validations/user')
const userController = require('../controllers/user')

router.post('/', userValidation.create, userController.create)
      .get('/', userValidation.list, userController.list)
      .put('/:id', userValidation.update, userController.update)
      .delete('/:id', userValidation.drop, userController.drop)

module.exports = router;