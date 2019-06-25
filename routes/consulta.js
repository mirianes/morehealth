const express = require('express')
const router = express.Router()

const consultaController = require('../controllers/consulta')

router.post('/', consultaController.create)
      .get('/:date', consultaController.list)

router.put('/:id', consultaController.update)

module.exports = router