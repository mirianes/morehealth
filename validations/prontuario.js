const Prontuario = require('../models').Prontuario

const checkEmpty = (parameter) => {
    if (parameter == '' || parameter == undefined) {
        return true
    }
    return false
}

const checkProntuarioExists = async (cartaoSUS, res) => {
    try {
        const prontuario = await Prontuario.findOne({
            where: {
                cartaoSUS: cartaoSUS
            }
        })

        if (prontuario == null) {
            return false
        }

        return true

    } catch (error) {
        return res.status(500).send(error)        
    }
}

const create = async (req, res, next) => {
    try {
        if (checkEmpty(req.body.dataAtt)) {
            return res.status(400).send({error: 'O campo data de atendimento não pode ficar vazio.'})
        }
        if (checkEmpty(req.body.cartaoSUS)) {
            return res.status(400).send({error: 'O campo cartão SUS não pode ficar vazio.'})
        }
        if (await checkProntuarioExists(req.body.cartaoSUS, res)) {
            return res.status(400).send({error: 'Já existe um prontuário com o cartão SUS informado.'})
        }
        if (checkEmpty(req.body.nome)) {
            return res.status(400).send({error: 'O campo nome não pode ficar vazio.'})
        }
        if (checkEmpty(req.body.dataNasc)) {
            return res.status(400).send({error: 'O campo data de nascimento não pode ficar vazio.'})
        }
        if (checkEmpty(req.body.raca)) {
            return res.status(400).send({error: 'O campo raça não pode ficar vazio.'})
        }
        if (checkEmpty(req.body.sexo)) {
            return res.status(400).send({error: 'O campo sexo não pode ficar vazio.'})
        }
        if (checkEmpty(req.body.estCivil)) {
            return res.status(400).send({error: 'O campo estado civil de usuário não pode ficar vazio.'})
        }
        if (checkEmpty(req.body.grauInst)) {
            return res.status(400).send({error: 'O campo grau de instrução não pode ficar vazio.'})
        }
        if (checkEmpty(req.body.queixa)) {
            return res.status(400).send({error: 'O campo queixa não pode ficar vazio.'})
        }
        if (checkEmpty(req.body.historico)) {
            return res.status(400).send({error: 'O campo historico de nascimento não pode ficar vazio.'})
        }
        if (checkEmpty(req.body.doencas)) {
            return res.status(400).send({error: 'O campo doenças não pode ficar vazio.'})
        }
        if (checkEmpty(req.body.alergias)) {
            return res.status(400).send({error: 'O campo alergias não pode ficar vazio.'})
        }
        if (checkEmpty(req.body.doadorOrgao)) {
            return res.status(400).send({error: 'O campo doador de órgão de usuário não pode ficar vazio.'})
        }
        if (checkEmpty(req.body.doadorSangue)) {
            return res.status(400).send({error: 'O campo doador de sangue não pode ficar vazio.'})
        }
        return next()
    } catch (error) {
        return res.status(500).send(error)        
    }
}

const list = (req, res, next) => {
    return next()
}

const update = async (req, res, next) => {
    if (!(await checkProntuarioExists(req.body.prontuario.cartaoSUS, res))) {
        return res.status(400).send({error: 'Não existe um prontuário com o cartão SUS informado.'})
    }
    next()
}

module.exports = {
    create,
    list,
    update
}