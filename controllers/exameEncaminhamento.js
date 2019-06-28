const { insertExamRouting, updateType, listExamRouting } = require('../models/exameEncaminhamento')

const create = async (req, res) => {
    try {
        let examRouting = await insertExamRouting(req.body)

        if (examRouting.result == 'created') {
            let examsRoutings = await listExamRouting(req.body.indicator)
            return res.status(200).send(examsRoutings.hits.hits)
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
        let newType = await updateType({
            id: req.params.id,
            type: req.body.type,
            vagas: req.body.vagas
        })
        
        if (newType.updated !== 0) {
            let examsRoutings = await listExamRouting(req.body.indicator)
            return res.status(200).send(examsRoutings.hits.hits)
        } else {
            return res.status(400).send(false)
        }
    } catch (error) {
        res.status(400).send({error})        
    }
}

const list = async (req, res) => {
    try {
        let examsRoutings = await listExamRouting(req.params.indicator)
        return res.status(200).send(examsRoutings.hits.hits)
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