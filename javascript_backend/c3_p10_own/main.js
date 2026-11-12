const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home page
app.get('/', (req, res) => {
  res.render('index');  // no variables needed
});

// Blog page
app.get('/blog', (req, res) => {
  res.render('blogs');   // no variables needed
});

// Login page 
app.get('/login', (req, res) => {
  res.render('login');  // no variables needed
}); 
 
// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});   