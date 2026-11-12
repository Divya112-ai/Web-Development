const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'))

const login=require('./router/login'    )
app.use('/login',login)

