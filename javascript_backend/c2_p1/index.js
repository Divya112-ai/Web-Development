// express used to listen the requests for the server and request
// get request
// console.log("hello this is manpreet")
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! manpreet')         // requeest and response
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
