const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');
const path = require('path');
app.set('views', path.join(__dirname, 'views'));



app.get('/', (req, res) => {
    const blogtitle = "why and when";
    const blogcontent = "it was very good";
    const sitename = "Manpreet Blog";
    const searchtext = "Explore more";

    res.render('index', {
        blogtitle,
        blogcontent,
        sitename,
        searchtext
    });
});
app.get('/blog', (req, res) => {
  res.render('blog', {
    sitename: 'Manpreet Blog',
    blogtitle: 'Why and When',
    blogcontent: 'Timing is everything in creativity and code.'
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

