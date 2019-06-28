const { insertEnc, listEnc } = require('../models/encaminhamento')
const { addExamRouting } = require('../models/exameEncaminhamento')

const create = async (req, res) => {
    try {
        let encaminhamento = await insertEnc(req.body)

        if (encaminhamento.result == 'created') {
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
        let encaminhamentos = await listEnc()
        return res.status(200).send(encaminhamentos.hits.hits)
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }
}

module.exports = {
    create,
    list
}