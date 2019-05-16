const express = require('express')
const router = express.Router()

router.get('/status', (req, res, next) => {
    res.status(200).send({
        status: "Launching"
    })
})

module.exports = router;