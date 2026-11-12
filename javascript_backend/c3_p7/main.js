const express = require('express')
const app = express()
const port = 3000
const fs=require('fs')
const routes=require('./routes/blog')
app.use('/blog',routes)
// app.use(express.static('public'))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// //middleware ,modifies request , , and start woruking with thst

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// middleware 1
app.use((req, res , next)=>{
    console.log(req.header)
    req.manpreet="hello from middleware"
    fs.appendFileSync("log.txt",`${Date.now()} is a ${req.method}\n` )
    console.log(`${Date.now()} is a ${req.method}`)
    res.send("hello from middleware")
    // next : next middleware
      next()
})

// middleware 2
app.use((req, res , next)=>{
    console.log("logged")
    next()
    // next : next middleware
})