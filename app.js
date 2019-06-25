const express = require('express')
const app = express()
// const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

// const indexRouter = require('./routes/index')
const consultRouter = require('./routes/consulta')
const vagasRouter = require('./routes/vagas')

app.use('/consult', consultRouter)
app.use('/vacancies', vagasRouter)
// app.use('/', indexRouter)

app.listen(process.env.PORT || 4001)
console.log(`MoreHealth ElasticSearchAPI listening on port ${process.env.PORT || 4001}`)