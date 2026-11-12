async function sleep() {
    return new Promise((resolved , reject)=>{
    
        setTimeout(()=>{
        resolved(45);
        },1000);
    })
}
let a =await sleep();
console.log(a);
(async function main() {
    // let b=await sleep();
    // console.log(b);
let [x,y]=[1,5]
console.log(x,y)
})