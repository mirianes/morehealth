const app = require('../app')

// const bodyParser = require('body-parser')
// const cors = require('cors')
const mongoose = require('mongoose')

// app.use(cors())
// app.use(bodyParser.json())

mongoose.connect('mongodb://mstn:mhapi@mongodb-2181-0.cloudclusters.net:10003/moreHealthDatabase?authSource=admin', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(process.env.PORT || 4000)
console.log(`MoreHealth API listening on port ${process.env.PORT || 4000}`)