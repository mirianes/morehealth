const Usf = require('../schemas/usf')

const create = (req, res) => {
    let usf = new Usf(req.body)
    usf.save().then(usf => {
        res.status(201).send(usf)
    }).catch(err => {
        res.status(400).send(err)
    })
}

module.exports = {
    create
}