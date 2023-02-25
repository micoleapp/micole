const { Router } = require("express");
const router = Router();
const { Nivel } = require("../db.js");

//------- PEDIR TODOS LOS GRADOS A LA BD--------
router.get("/", async (req, res) => {

  try {
    let nivel;
    nivel = await Nivel.findAll({
      attributes: [
        "id",
        "nombre_nivel",
      ],
    });

    res.json(nivel);
  } catch (err) {
    res.json({ err });
  }
});

module.exports = router;
