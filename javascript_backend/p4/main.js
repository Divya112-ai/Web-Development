const  fs=require("fs")
console.log(fs)
console.log("starting")
// fs.writeFileSync("man.txt","this is manpreet")
// console.log("ending")
fs.writeFile("man2.txt","this is manpreet2",()=>{
    console.log("dome")
    fs.readFile("man2.txt","utf-8",(err,data)=>{

        console.log(data)
    })
    })
console.log("last line")    



