const Usf = require('../schemas/usf')

const create = (req, res) => {
    let usf = new Usf(req.body)
    usf.save().then(usf => {
        res.status(201).send(usf)
    }).catch(err => {
        res.status(400).send(err)
    })
}

const list = (req, res) => {
    Usf.find((err, usfs) => {
        if (err) {
            return res.status(400).send(err)
        } else {
            return res.status(200).send(usfs)
        }
    })
}

const update = (req, res) => {
    Usf.findById(req.params.id, (error, usf) => {
        if (error) {
            return res.status(400).send(error)
        } else {
            usf.name = req.body.name
            usf.state = req.body.state
            usf.city = req.body.city
            usf.cnes = req.body.cnes
            usf.save().then(newUsf => {
                return res.status(200).send(newUsf)
            }).catch(err => {
                return res.status(400).send(err)
            })
        }
    })
}

const drop = (req, res) => {
    Usf.findByIdAndDelete(req.params.id, req.body, (error, result) => {
        if (error) {
            return res.status(400).send(error)
        } else {
            return res.status(200).send("USF deletada com sucesso.")
        }
    })
}

module.exports = {
    create,
    list,
    update,
    drop
}