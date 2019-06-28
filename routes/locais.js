const express = require('express')
const router = express.Router()

const localController = require('../controllers/locais')

router.post('/', localController.create)
      .get('/', localController.list)
      .put('/:id', localController.update)

module.exports = router