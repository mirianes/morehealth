const express = require('express')
const router = express.Router()

const usfValidation = require('../validations/usf')
const usfController = require('../controllers/usf')

router.post('/', usfValidation.create, usfController.create)

module.exports = router;