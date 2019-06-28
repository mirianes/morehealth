const express = require('express')
const router = express.Router()

const exameController = require('../controllers/exame')

router.post('/', exameController.create)
      .get('/:date', exameController.list)

module.exports = router