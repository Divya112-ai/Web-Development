use("CrudDb")
console.log(db)
db.createCollection("courses")
// db.courses.insertOne({
//     title: "Learn MongoDB",
//     price :1000,
//     assignments :12,
//     projects:5 
// })
// db.courses.insertMany([
//     {
//         title: "Learn NodeJS",
//         price :1500,
//         assignments :10,
//         projects:3
//     },
//     {
//         title: "Learn ExpressJS",
//         price :1200,
//         assignments :8,
//         projects:2
//     },
//     {
//         title: "Learn ReactJS",
//         price :2000,
//         assignments :15,
//         projects:6
//     }
// ])
 db.courses.find({
     price: 1200  
}
 )
 db.courses.count();
console.log(db.courses.count())
console.log(db.courses.find().toArray())
let a=db.courses.findOne({price:1200})
console.log(a)

db.courses.updateOne(
    {price:1500},
    {
       $set: {price:1800}

}  )
db.courses.deleteOne({price:1000})
db.courses.deleteMany({price:1800})
console.log(db.courses.find().toArray())
