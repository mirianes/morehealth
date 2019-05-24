const app = require('../app')
const PORT = 4000

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

app.listen(PORT, () => {
    console.log('MoreHealth API listening on port 4000')
})