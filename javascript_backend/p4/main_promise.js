import fs from "fs/promises";
let a=await fs.readFile("man2.txt");
let b=await fs.appendFile("man2.txt","\nmanpreet is good girl")
let c=await fs.writeFile("man2.txt","\nmanpreet is good girl")
console.log(a.toString());