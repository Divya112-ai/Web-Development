const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    console.log('hello hey this is manpreet');
    return res.send('hello World22222 port home');
});
app.post('/home',(req,res)=>{
  console.log("hey this is manpreet home")
    return res.send('Hello World!22222 post home');
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
}); 



