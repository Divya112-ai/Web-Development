let arr=[1,2,3,4,5]
console.log(arr)
console.log(arr.length)
//array is mutable
console.log(arr[2]);
arr[3]=455;
console.log(arr);
console.log(arr.toString());
console.log(arr.join(" and "))
console.log(arr.pop())
console.log(arr.push("100"))
console.log(arr.shift());
console.log(arr.unshift("2000"))
delete arr[3];
// size does not change only value delet
let num=[1,2,3,4,5]
num.splice(1,2);
console.log(num);

// arr.forEach(value , indexedDB,arr){
//     console.log(value,indexedDB,arr)
// }

let obj={
    a:1, b:3,c:4
}
// for (const key in obj) {
//   console.log(element)
//   console.log(key , element)
// }
arr.forEach(element => {
    console.log(index,arr)
});
for (const element of obj) {
    console.log(element)
}