const { Router } = require("express");
const router = Router();
const { Metodos } = require("../db.js");

//------- PEDIR TODOS LOS GRADOS A LA BD--------
router.get("/", async (req, res) => {
  try {
    
    const metodos = await Metodos.findAll({
      attributes: ["id_metodo", "nombre_metodo"],
    });
    res.json(metodos);
  } catch (err) {
    res.json({ err });
  }
});



module.exports = router;
