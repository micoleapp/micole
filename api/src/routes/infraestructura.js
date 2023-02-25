const { Router } = require("express");
const router = Router();
const { Infraestructura } = require("../db.js");

//------- PEDIR TODOS LAS INFRAESTRUCTURAS A LA BD--------
router.get("/", async (req, res) => {

  try {
    let infraestructura;
    infraestructura = await Infraestructura.findAll({
      attributes: [
        "id",
        "nombre_infraestructura",
        "imagen",
        "InfraestructuraTipoId",
      ],
    });

    res.json(infraestructura);
  } catch (err) {
    res.json({ err });
  }
});

module.exports = router;
