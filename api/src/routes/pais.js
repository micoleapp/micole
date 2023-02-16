const { Router } = require("express");
const router = Router();
const {Pais} = require("../db.js");
// const getComponentData = require("../funciones/getComponentData.js");
// const ratingProm = require("../funciones/ratingProm.js");

//------- PEDIR TODOS LOS COLEGIOS A LA BD--------
router.get("/", async (req, res) => {
  try {
    let pais;
    pais = await Pais.findAll({
       attributes: [
        "id",
        "nombre_pais",
      ],
    });

    res.send(pais);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
