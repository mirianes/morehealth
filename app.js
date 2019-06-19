const express = require('express')
const app = express()
// const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

const { client } = require('./config/config')

client.ping({
    requestTimeout: 30000,
  }, function (error) {
    if (error) {
      console.error('elasticsearch cluster is down!');
    } else {
      console.log('All is well');
    }
  });
// const indexRouter = require('./routes/index')
// const userRouter = require('./routes/user')
// const usfRouter = require('./routes/usf')

// app.use('/user', userRouter)
// app.use('/usf', usfRouter)
// app.use('/', indexRouter)

module.exports = app