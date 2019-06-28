const express = require('express')
const router = express.Router()

const examRoutingController = require('../controllers/exameEncaminhamento')

/*  
        INDICADORES
    EXAME = 1
    ENCAMINHAMENTO = 2
*/

router.post('/', examRoutingController.create)
      .get('/:indicator', examRoutingController.list)
      .put('/:id', examRoutingController.update)

module.exports = router