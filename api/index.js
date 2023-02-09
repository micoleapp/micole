require("dotenv").config();
const server = require("./src/app.js");
const { conn } = require("./src/db.js");

conn.sync({force:true}).then(()=>{
  server.listen(process.env.PORT,()=>{
    console.log(`⇒ listening at port ${process.env.PORT}`)
  })
})