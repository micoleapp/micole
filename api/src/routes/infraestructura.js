const { Router } = require("express");
const router = Router();
const { Infraestructura, Infraestructura_tipo } = require("../db.js");

//------- PEDIR TODOS LAS INFRAESTRUCTURAS A LA BD--------
router.get("/", async (req, res) => {
  try {
    let infraestructura;
    infraestructura = await Infraestructura.findAll({
      include: [
        {
          model: Infraestructura_tipo,
          attributes: ["infraestructura_tipo"],
        },
      ],
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
