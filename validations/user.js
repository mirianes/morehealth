const User = require('../schemas/user')
const { checkCnesExists } = require('./usf')
const { checkEmpty } = require('./util')

const create = async (req, res, next) => {
    try {
        if (checkEmpty(req.body.usf_id)) {
            return res.status(400).send({error: 'O campo USF não pode ficar vazio.'})
        }
        if (await checkCnesExists(req.body.usf_id) == false) {
            return res.status(400).send({error: 'Essa USF não existe.'})
        }
        if (checkEmpty(req.body.email)) {
            return res.status(400).send({error: 'O campo e-mail não pode ficar vazio.'})
        }
        if (await checkEmailExists(req.body.email, res)) {
            return res.status(400).send({error: 'Esse e-mail já existe.'})
        }
        if (checkEmpty(req.body.password)) {
            return res.status(400).send({error: 'O campo senha não pode ficar vazio.'})
        }
        if (checkEmpty(req.body.name)) {
            return res.status(400).send({error: 'O campo nome não pode ficar vazio.'})
        }
        if (checkEmpty(req.body.code)) {
            return res.status(400).send({error: 'O campo identificador não pode ficar vazio.'})
        }
        if (checkEmpty(req.body.phone)) {
            return res.status(400).send({error: 'O campo telefone não pode ficar vazio.'})
        }
        if (checkEmpty(req.body.user_type)) {
            return res.status(400).send({error: 'O campo tipo de usuário não pode ficar vazio.'})
        }
        if (req.body.user_type !== "1" && req.body.user_type !== "2") {
            return res.status(400).send({error: 'O tipo de usuário informado não é válido.'})
        }
        return next()
    } catch (error) {
        return res.status(500).send(error)        
    }
}

const list = async (req, res, next) => {
    return next()
}

const update = async (req, res, next) => {
    if (await checkUserExists(req.params.id, res) == false) {
        return res.status(400).send({error: 'Esse usuário não existe.'})
    }
    return next()
}

const drop = async (req, res, next) => {
    if (await checkUserExists(req.params.id, res) == false) {
        return res.status(400).send({error: 'Esse usuário não existe.'})
    }
    return next()
}

const login = async (req, res, next) => {
    if (checkEmpty(req.body.email)) {
        return res.status(400).send({error: 'O campo e-mail não pode ficar vazio.'})
    }
    if (checkEmpty(req.body.password)) {
        return res.status(400).send({error: 'O campo senha não pode ficar vazio.'})
    }
    if (await checkEmailExists(req.body.email, res) == false) {
        return res.status(400).send({error: 'Usuário não encontrado.'})
    }
    return next()
}

const checkEmailExists = async (email, res) => {
    try {
        const user = await User.findOne({
            email: email
        })
        if (user != null) return true
        return false
    } catch (error) {
        return res.status(400).send({error: error})        
    }
}

const checkUserExists = async (id, res) => {
    try {
        const user = await User.findOne({
            _id: id
        })
        if (user != null) return true
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
    login
}