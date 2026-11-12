import express from "express";
import mongoose from "mongoose";
import  {todo} from "./models/todo.js";    

let a= await mongoose.connect("mongodb://localhost:27017/todo");
const app = express();
const port = 3000;

app.get('/', (req, res) => {
 const todonew=new todo({
    title:"hey i am ", 
    description :"learning mongoose",
    completed:true,
    nom:1
 })
    todonew.save();
 res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});   