const express = require('express')
const router = express.Router()

const vagasController = require('../controllers/vagas')

router.post('/', vagasController.create)
      .get('/:date', vagasController.list)

router.put('/:id', vagasController.update)

module.exports = router