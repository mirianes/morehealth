const { insertVaga, updateVaga, listVaga } = require('../models/vagas')

const create = async (req, res) => {
    try {
        let vaga = await insertVaga(req.body)
        if (vaga.result == 'created') {
            let vagas = await listVaga(req.body.date)
            return res.status(200).send(vagas.hits.hits)
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
        let vaga = await updateVaga({
            id: req.params.id,
            totalVagas: req.body.totalVagas
        })
        if (vaga.updated) {
            let vagas = await listVaga(req.body.date)
            return res.status(200).send(vagas.hits.hits)
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
        let vagas = await listVaga(req.params.date)
        return res.status(200).send(vagas.hits.hits)
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