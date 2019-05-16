const express = require('express')
const app = express()
// const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const usfRouter = require('./routes/usf')

app.use('/user', userRouter)
app.use('/usf', usfRouter)
app.use('/', indexRouter)

module.exports = app