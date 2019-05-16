const Usf = require('../schemas/usf')
const { checkEmpty } = require('./util')

const create = async (req, res, next) => {
    if (checkEmpty(req.body.cnes)) {
        return res.status(400).send('O campo usf não pode ficar vazio.')
    }
    if (await checkUsfExists(req.body.cnes)) {
        return res.status(400).send('Já existe uma USF com esse CNES.')
    }
    if (checkEmpty(req.body.name)) {
        return res.status(400).send('O campo nome não pode ficar vazio.')
    }
    if (checkEmpty(req.body.state)) {
        return res.status(400).send('O campo estado não pode ficar vazio.')
    }
    if (checkEmpty(req.body.city)) {
        return res.status(400).send('O campo cidade não pode ficar vazio.')
    }
    return next()
}

const checkUsfExists = async (usfID) => {
    try {
        const usf = await Usf.findOne({
            cnes: usfID
        })
        if (usf != null) return true
        return false
    } catch (error) {
        return false
    }
}

module.exports = {
    create,
    checkUsfExists
}