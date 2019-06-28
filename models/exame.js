const { examClient } = require('../config/config')

const indexName = 'morehealth_exame'
const typeName = 'exame'

const insertExam = async (data) => {
    return await examClient.index({
        index: indexName,
        type: typeName,
        body: {
            prontuarioID: data.prontuarioID,
            pacientName: data.pacientName,
            date: data.date,
            exam: data.exam,
            place: data.place
        }
    })
}

const listExam = async (data) => {
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
    insertExam,
    listExam
}