const { consultClient } = require('../config/config')

const indexName = 'morehealth_consulta'
const typeName = 'consulta'

const insertConsult = async (data) => {
    return await consultClient.index({
        index: indexName,
        type: typeName,
        body: {
            prontuarioID: data.prontuarioID,
            pacientName: data.pacientName,
            date: data.date,
            completed: data.completed
        }
    })
}

const updateConsult = async (data) => {
    return await consultClient.updateByQuery({
        index: indexName,
        conflicts: "proceed",
        body: {
            query: {
                ids: {
                    type: typeName,
                    values: [data]
                },
            },
            script: {
                source: "ctx._source.completed = !ctx._source.completed"
            }
        }
    })
}

const listConsult = async (data) => {
    return await consultClient.search({
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
    insertConsult,
    updateConsult,
    listConsult
}