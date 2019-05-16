const User = require('../schemas/user')
const { checkUsfExists } = require('./usf')
const { checkEmpty } = require('./util')

const create = async (req, res, next) => {
    try {
        if (checkEmpty(req.body.usf_id)) {
            return res.status(400).send('O campo usf não pode ficar vazio.')
        }
        if (await checkUsfExists(req.body.usf_id) == false) {
            return res.status(400).send('Essa usf não existe.')
        }
        if (checkEmpty(req.body.email)) {
            return res.status(400).send('O campo e-mail não pode ficar vazio.')
        }
        if (await checkEmailExists(req.body.email)) {
            return res.status(400).send('Esse e-mail já existe.')
        }
        if (checkEmpty(req.body.username)) {
            return res.status(400).send('O campo nome de usuário não pode ficar vazio.')
        }
        if (await checkUsernameExists(req.body.username)) {
            return res.status(400).send('Esse nome de usuário já existe.')
        }
        if (checkEmpty(req.body.password)) {
            return res.status(400).send('O campo senha não pode ficar vazio.')
        }
        if (checkEmpty(req.body.name)) {
            return res.status(400).send('O campo nome não pode ficar vazio.')
        }
        if (checkEmpty(req.body.code)) {
            return res.status(400).send('O campo identificador não pode ficar vazio.')
        }
        if (checkEmpty(req.body.phone)) {
            return res.status(400).send('O campo telefone não pode ficar vazio.')
        }
        if (checkEmpty(req.body.user_type)) {
            return res.status(400).send('O campo tipo de usuário não pode ficar vazio.')
        }
        if (req.body.user_type !== "1" && req.body.user_type !== "2") {
            return res.status(400).send('O tipo de usuário informado não é válido.')
        }
        return next()
    } catch (error) {
        return res.status(500).send(error)        
    }
}

const list = async (req, res, next) => {
    next()
}

const update = async (req, res, next) => {
    if (await checkUserExists(req.params.id) == false) {
        return res.status(400).send('Esse usuário não existe.')
    }
    next()
}

const drop = async (req, res, next) => {
    if (await checkUserExists(req.params.id) == false) {
        return res.status(400).send('Esse usuário não existe.')
    }
    next()
}

const checkEmailExists = async (email) => {
    const user = await User.findOne({
        email: email
    })
    if (user != null) return true
    return false
}

const checkUsernameExists = async (username) => {
    const user = await User.findOne({
        username: username
    })
    if (user != null) return true
    return false
}

const checkUserExists = async (id) => {
    try {
        const user = await User.findOne({
            _id: id
        })
        if (user != null) return true
        return false
    } catch (error) {
        return false
    }
}

module.exports = {
    create,
    list,
    update,
    drop
}