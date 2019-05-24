const Usf = require('../schemas/usf')
const { checkEmpty } = require('./util')

const create = async (req, res, next) => {
    if (checkEmpty(req.body.cnes)) {
        return res.status(400).send({error: 'O campo cnes não pode ficar vazio.'})
    }
    if (await checkCnesExists(req.body.cnes, res)) {
        return res.status(400).send({error: 'Já existe uma USF com esse CNES.'})
    }
    if (checkEmpty(req.body.name)) {
        return res.status(400).send({error: 'O campo nome não pode ficar vazio.'})
    }
    if (checkEmpty(req.body.state)) {
        return res.status(400).send({error: 'O campo estado não pode ficar vazio.'})
    }
    if (checkEmpty(req.body.city)) {
        return res.status(400).send({error: 'O campo cidade não pode ficar vazio.'})
    }
    if (checkEmpty(req.body.phone)) {
        return res.status(400).send({error: 'O campo telefone não pode ficar vazio.'})
    }
    return next()
}

const list = async (req, res, next) => {
    next()
}

const update = async (req, res, next) => {
    if (await checkUsfExists(req.params.id, res) == false) {
        return res.status(400).send({error: 'Essa USF não existe.'})
    }
    if (checkEmpty(req.body.cnes)) {
        return res.status(400).send({error: 'O campo cnes não pode ficar vazio.'})
    }
    if (checkEmpty(req.body.name)) {
        return res.status(400).send({error: 'O campo nome não pode ficar vazio.'})
    }
    if (checkEmpty(req.body.state)) {
        return res.status(400).send({error: 'O campo estado não pode ficar vazio.'})
    }
    if (checkEmpty(req.body.city)) {
        return res.status(400).send({error: 'O campo cidade não pode ficar vazio.'})
    }
    if (checkEmpty(req.body.phone)) {
        return res.status(400).send({error: 'O campo telefone não pode ficar vazio.'})
    }
    next()
}

const drop = async (req, res, next) => {
    if (await checkUsfExists(req.params.id, res) == false) {
        return res.status(400).send({error: 'Essa USF não existe.'})
    }
    next()
}

const checkUsfExists = async (usfID, res) => {
    try {
        const usf = await Usf.findOne({
            _id: usfID
        })
        if (usf != null) return true
        return false
    } catch (error) {
        return res.status(400).send({error: error})        
    }
}

const checkCnesExists = async (usfID, res) => {
    try {
        const usf = await Usf.findOne({
            cnes: usfID
        })
        if (usf != null) return true
        return false
    } catch (error) {
        return res.status(400).send({error: error})        
    }
}

module.exports = {
    create,
    list,
    update,
    drop,
    checkCnesExists
}