const elasticsearch = require('elasticsearch')

const bonsai_url = 'https://apkvjhlyd9:uf46209r8t@morehealth-api-3512295440.ap-southeast-2.bonsaisearch.net:443'

const client = new elasticsearch.Client({
    host: bonsai_url
})

module.exports = client