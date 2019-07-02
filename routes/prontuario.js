const express = require('express')
const router = express.Router()

const prontuarioValidation = require('../validations/prontuario')
const prontuarioController = require('../controllers/prontuario')

router.post('/', prontuarioValidation.create, prontuarioController.create)
      .get('/', prontuarioValidation.list, prontuarioController.list)
      .put('/:id', prontuarioValidation.update, prontuarioController.update)

module.exports = router