const { insertLocal, updateLocal, listLocal } = require('../models/locais')

const create = async (req, res) => {
    try {
        let local = await insertLocal(req.body)

        if (local.result == 'created') {
            let locais = await listLocal()
            return res.status(200).send(locais.hits.hits)
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
        let newLocal = await updateLocal({
            id: req.params.id,
            name: req.body.name
        })
        
        if (newLocal.updated !== 0) {
            let locais = await listLocal()
            return res.status(200).send(locais.hits.hits)
        } else {
            return res.status(400).send(false)
        }
    } catch (error) {
        res.status(400).send({error})        
    }
}

const list = async (req, res) => {
    try {
        let locais = await listLocal()
        return res.status(200).send(locais.hits.hits)
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