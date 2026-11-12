const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('about', (req, res) => {
  res.send('Hello World about!');
});
app.get('contact', (req, res) => {
  res.send('Hello World conatcts!');
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// server.mjs
// import { createServer } from 'node:http';

// const server = createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello World!23\n');
// });

// // starts a simple http server locally on port 3000
// server.listen(3000, '127.0.0.1', () => {
//   console.log('Listening on 127.0.0.1:3000');
// });

// // run with `node server.mjs`

