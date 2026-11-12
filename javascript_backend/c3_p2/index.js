const { createServer } = require('node:http');
const fs=require('fs');

const hostname = '127.0.0.1';
const port = 3001;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html;');
  
//   res.end('This is my first serverrr');
  res.end('<h1> Hello Worldd </h1>');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
