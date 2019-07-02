const Prontuario = require('../models').Prontuario

const create = async (req, res) => {
    try {
        const prontuario = await Prontuario.create({
            dataAtt: req.body.dataAtt,
            cartaoSUS: req.body.cartaoSUS,
            nome: req.body.nome,
            dataNasc: req.body.dataNasc,
            raca: req.body.raca,
            sexo: req.body.sexo,
            estCivil: req.body.estCivil,
            grauInst: req.body.grauInst,
            queixa: req.body.queixa,
            historico: req.body.historico,
            doencas: req.body.doencas,
            alergias: req.body.alergias,
            doadorOrgao: req.body.doadorOrgao,
            doadorSangue: req.body.doadorSangue,
            outrasInfo: req.body.outrasInfo
        })
        
        return res.status(201).send(prontuario)
    } catch (error) {
        return res.status(400).send({error: error})
    }
}

const list = async (req, res) => {
    try {
        const prontuarios = await Prontuario.findAll({
            order: [['id', 'ASC']]
        })

        return res.status(200).send(prontuarios)
    } catch (error) {
        return res.status(400).send({error: error})        
    }
}

const update = async (req, res) => {
    try {
        const prontuario = await Prontuario.update(req.body.prontuario, {
            where: {
                id: req.params.id
            }
        })

        console.log(prontuario)

        return res.status(200).send(prontuario)
    } catch (error) {
        return res.status(400).send({error: error})        
    }
}

module.exports = {
    create,
    list,
    update
}