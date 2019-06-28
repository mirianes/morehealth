const mongoAPI = {
    host: "https://morehealth-api.herokuapp.com"
}

const elasticAPI = {
    host: "https://morehealth-elasticsearch-api.herokuapp.com"
}

const imgData = 'data:image/png;base64,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'

module.exports = {
    mongoAPI,
    imgData,
    elasticAPI
}