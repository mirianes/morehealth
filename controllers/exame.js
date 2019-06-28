const { insertExam, listExam } = require('../models/exame')
const { addExamRouting } = require('../models/exameEncaminhamento')

const create = async (req, res) => {
    try {
        let exame = await insertExam(req.body)

        if (exame.result == 'created') {
            let updateVagas = await addExamRouting(req.body.idExamRouting)
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
        let exames = await listExam()
        return res.status(200).send(exames.hits.hits)
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
}

module.exports = {
    create,
    list
}