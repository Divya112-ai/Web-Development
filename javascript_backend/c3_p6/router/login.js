const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'))

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
module.exports = app;