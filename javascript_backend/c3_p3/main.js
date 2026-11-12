const fs=require('fs');
console.log(fs)
console.log("starting")
fs.writeFileSync('test.txt','hello world');   // syncronus : wait to complete the task
fs.writeFile("text2.txt","hello world 2",()=>{   // asynchronuous not wit to complet3e these task ending is first completed , then the content writtwn inside that coccured

    console.log("file written")
    fs.readFile('text2.txt',(err, data)=>{
        console.log(err,data.toString());
    })
});  

console.log("ending")

