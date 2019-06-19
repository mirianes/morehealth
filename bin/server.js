const app = require('../app')

app.listen(process.env.PORT || 4001)
console.log(`MoreHealth ElasticSearchAPI listening on port ${process.env.PORT || 4001}`)