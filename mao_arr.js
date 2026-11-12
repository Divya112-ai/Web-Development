let arr=[1,2,3,4,5];
let newarr=[];
for(let i=0 ;i<arr.length;i++)
{
    const element=arr[i];
    newarr.push(element**2)
}
console.log(newarr)

//or
let new2arr=arr.map(element=>{
    return element**2;
})
console.log(new2arr)

// filter 
const my_fun=(e)=>{
    if(e>7)
    return true;
}
console.log(new2arr.filter(my_fun))

//reduce
let arr2=[1,3,5,6,6]
const reduce =(a,b)=>{
    return a+b;
}
console.log(arr2.reduce(reduce))