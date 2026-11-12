const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'))
app.get('/', (req, res) => {
     console.log('GET Request to the homepage')
  res.send('Hello World!')
 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.post('/', (req, res) => {
    res.send('POST Request to the homepage')
    console.log('POST Request to the homepage')
})
app.get("/index",(req,res)=>{
   res.sendFile('templates/index.html',{root:__dirname})
})
app.get("/api",(req,res)=>{
    res.json({name:"John",age:30,city:"New York"})
})
