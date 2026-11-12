let rand=Math.random()
let first, second, third
if(rand<0.33)
{
   // 0 0.33 0.66 1
   first="crazy"
}
else if(rand<0.66 && rand>=0.33)
{
    first="amaging"
}
else{
    first="fire"
}
rand=Math.random()
if(rand<0.33)
{
   // 0 0.33 0.66 1
   second="engine"
}
else if(rand<0.66 && rand>=0.33)
{
    second="foods"
}
else{
    second="garments"
}

if(rand<0.33)
{
   // 0 0.33 0.66 1
   third="bros"
}
else if(rand<0.66 && rand>=0.33)
{
    third="limited"
}
else{
    third="hub"
}
console.log(" "+first+" "+second+ " "+third)