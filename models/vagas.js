const { consultClient } = require('../config/config')

const indexName = 'morehealth_vagas'
const typeName = 'vagas'

const insertVaga = async (data) => {
    return await consultClient.index({
        index: indexName,
        type: typeName,
        body: {
            date: data.date,
            totalVagas: data.totalVagas,
            vagasOcupadas: data.vagasOcupadas
        }
    })
}

const updateVaga = async (data) => {
    return await consultClient.updateByQuery({
        index: indexName,
        conflicts: "proceed",
        body: {
            query: {
                ids: {
                    type: typeName,
                    values: [data.id]
                },
            },
            script: {
                "source": "ctx._source.totalVagas = params.totalVagas",
                "lang": "painless",
                "params" : {
                  "totalVagas": data.totalVagas
                }
            }
        }
    })
}

const addConsult = async (data) => {
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
                "source": "ctx._source.vagasOcupadas += 1"
            }
        }
    })
}

const listVaga = async (data) => {
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
    insertVaga,
    updateVaga,
    addConsult,
    listVaga
}