const express = require('express')
const app = express()
// const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

const prontuarioRouter = require('./routes/prontuario')

app.use('/prontuario', prontuarioRouter)

app.listen(process.env.PORT || 4002)
console.log(`MoreHealth ElasticSearchAPI listening on port ${process.env.PORT || 4002}`)