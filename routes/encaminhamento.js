const express = require('express')
const router = express.Router()

const encaminhamentoController = require('../controllers/encaminhamento')

router.post('/', encaminhamentoController.create)
      .get('/:date', encaminhamentoController.list)

module.exports = router