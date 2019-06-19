const elasticsearch = require('elasticsearch')

const bonsai_url = 'https://12zrv21qrz:gcnp6flr7n@morehealth-api-3512295440.ap-southeast-2.bonsaisearch.net:443'

const client = new elasticsearch.Client({
    host: bonsai_url
})

module.exports = {
    client
}