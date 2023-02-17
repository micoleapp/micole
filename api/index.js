require("dotenv").config();
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const insertDistritos = require("./src/utils/insertDistritos");

conn.sync({ force:false }).then(() => {
  insertDistritos();
  server.listen(process.env.PORT, () => {
    console.log(`⇒ listening at port ${process.env.PORT}`);
  });
});
