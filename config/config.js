const elasticsearch = require('elasticsearch')

const consult_url = 'https://t2q52h6mqq:dgx4334vwo@morehealth-consulta-3055891521.us-west-2.bonsaisearch.net:443'
const exam_url = 'https://kbaqz76vfm:hwesamedbl@morehealth-examrouti-5496349902.us-east-1.bonsaisearch.net:443'

const consultClient = new elasticsearch.Client({
    host: consult_url
})

const examClient = new elasticsearch.Client({
    host: exam_url
})

module.exports = {
    consultClient,
    examClient
}