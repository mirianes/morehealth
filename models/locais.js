const { examClient } = require('../config/config')

const indexName = 'morehealth_locais'
const typeName = 'locais'

const insertLocal = async (data) => {
    return await examClient.index({
        index: indexName,
        type: typeName,
        body: {
            name: data.name
        }
    })
}

const updateLocal = async (data) => {
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
                "source": "ctx._source.name = params.name",
                "lang": "painless",
                "params" : {
                  "name": data.name
                }
            }
        }
    })
}

const listLocal = async () => {
    return await examClient.search({
        index: indexName,
        type: typeName,
        body: {
            size: 50,
            query: { match_all: {} }
        }
    })
}

module.exports = {
    insertLocal,
    updateLocal,
    listLocal
}