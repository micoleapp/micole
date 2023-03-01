const { Router } = require("express");
const { getGradosByNivel } = require("../controllers/gradoController.js");
const router = Router();
const { Grado } = require("../db.js");

//------- PEDIR TODOS LOS GRADOS A LA BD--------
router.get("/", async (req, res) => {

  try {
    let grado;
    grado = await Grado.findAll({
      attributes: [
        "id",
        "nombre_grado",
      ],
    });

    res.json(grado);
  } catch (err) {
    res.json({ err });
  }
});


router.get("/vacantes", getGradosByNivel);

module.exports = router;
