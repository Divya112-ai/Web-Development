
"use client"
export default function Home() {
  const handleClick=async()=>{
    let data={name:"anu", role:"coderrr"};
    let a=await fetch('/api/route',{method:'POST',headers:{"contentType":'application/json'},body:JSON.stringify({name:"john"})})
;
    let res=await a.json();
    console.log(res)

  }
  return (
   <div>
      <h1 className="text-xl font-bold">API Routes</h1>
    <button onClick={handleClick}>click me </button>
   </div>  );
}
