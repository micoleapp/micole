const { Router } = require("express");
const router = Router();
const { Dificultades } = require("../db.js");

//------- PEDIR TODOS LOS GRADOS A LA BD--------
router.get("/", async (req, res) => {
  try {
    
    const dificultades = await Dificultades.findAll({
      attributes: ["id_dificultad", "nombre_dificultad"],
    });
    res.json(dificultades);
  } catch (err) {
    res.json({ err });
  }
});


module.exports = router;
