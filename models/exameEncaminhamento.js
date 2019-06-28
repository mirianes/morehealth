const { examClient } = require('../config/config')

const indexName = 'morehealth_exameencaminhamento'
const typeName = 'exameEncaminhamento'

const insertExamRouting = async (data) => {
    return await examClient.index({
        index: indexName,
        type: typeName,
        body: {
            type: data.type,
            vagas: data.vagas,
            indicator: data.indicator
        }
    })
}

const updateType = async (data) => {
    return await examClient.updateByQuery({
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
                "source": "ctx._source.type = params.type; ctx._source.vagas = params.vagas",
                "lang": "painless",
                "params" : {
                  "type": data.type,
                  "vagas": data.vagas
                }
            }
        }
    })
}

const addExamRouting = async (data) => {
    return await examClient.updateByQuery({
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
                "source": "ctx._source.vagas -= 1"
            }
        }
    })
}

const listExamRouting = async (data) => {
    return await examClient.search({
        index: indexName,
        type: typeName,
        body: {
            size: 50,
            query: {
                match: {
                    indicator: data
                }
            }
        }
    })
}

module.exports = {
    insertExamRouting,
    updateType,
    addExamRouting,
    listExamRouting
}