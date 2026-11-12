const express = require('express');
const { render } = require('../c3_p7/routes/blog');
const app = express()
const port = 3000
app.set('view engine', 'ejs');
const path = require('path');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    let sitename="adidas"
    let searchtext="search now" // this two values are from database
//   res.sendFile('templates/index.html',{root:__dirname})
    res.render("index",{sitename:sitename,searchtext:searchtext})
})
app.get('/blog/:slug',(req, res)=>{
    const blogtitle="why and when"
    const blogcontent="it was very good"
    res,render('blogpost',{blogtitle:blogtitle,blogcontent:blogcontent})
    // here we want to add this two values(variable) to the blogpost.html tin templates
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
//ejs is template engine which helps to add dynamic values to html pages