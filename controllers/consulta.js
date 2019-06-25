const { insertConsult, updateConsult, listConsult } = require('../models/consulta')
const { addConsult } = require('../models/vagas')

const create = async (req, res) => {
    try {
        let consulta = await insertConsult(req.body)
        let vaga = await addConsult(req.body.idVaga)

        if (consulta.result == 'created' && vaga.updated) {
            return res.status(201).send(true)
        } else {
            return res.status(400).send(false)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
}

const update = async (req, res) => {
    try {
        let consulta = await updateConsult(req.params.id)
        if (consulta.updated) {
            return res.status(200).send(true)
        } else {
            return res.status(400).send(false)
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
}

const list = async (req, res) => {
    try {
        let consultas = await listConsult(req.params.date)
        return res.status(200).send(consultas.hits.hits)
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
}

module.exports = {
    create,
    update,
    list
}