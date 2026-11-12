import fs from 'fs/promises';
let a=await fs.readFile('text2.txt')
let b= await fs.writeFile('text2.txt','hello world this is my promise function')

 console.log(a.toString())  // Promise { <pending> }  because readFile is async function it returns a promise object
 console.log(b)  // undefined because writeFile does not return anything

 let c=await fs.appendFile('test.txt','\n this is appended text')
 console.log(c)  // undefined because appendFile does not return anything

    
 