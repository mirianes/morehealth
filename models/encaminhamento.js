const { examClient } = require('../config/config')

const indexName = 'morehealth_encaminhamento'
const typeName = 'encaminhamento'

const insertEnc = async (data) => {
    return await examClient.index({
        index: indexName,
        type: typeName,
        body: {
            prontuarioID: data.prontuarioID,
            pacientName: data.pacientName,
            date: data.date,
            specialty: data.specialty,
            place: data.place
        }
    })
}

const listEnc = async (data) => {
    return await examClient.search({
        index: indexName,
        type: typeName,
        body: {
            size: 50,
            query: {
                match: {
                    date: data
                }
            }
        }
    })
}

module.exports = {
    insertEnc,
    listEnc
}