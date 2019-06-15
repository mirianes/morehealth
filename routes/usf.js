const express = require('express')
const router = express.Router()

const usfValidation = require('../validations/usf')
const usfController = require('../controllers/usf')

router.post('/', usfValidation.create, usfController.create)
      .get('/', usfValidation.list, usfController.list)
      .put('/:id', usfValidation.update, usfController.update)
      .delete('/:id', usfValidation.drop, usfController.drop)

router.get('/getData/:id', usfValidation.getData, usfController.getData)

module.exports = router;