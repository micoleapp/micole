const { Router } = require("express");
const router = Router();
const {Departamento} = require("../db.js");
// const getComponentData = require("../funciones/getComponentData.js");
// const ratingProm = require("../funciones/ratingProm.js");

//------- PEDIR TODOS LOS COLEGIOS A LA BD--------
router.get("/", async (req, res) => {
  //   const { brand, category, priceMin, priceMax } = req.query;
  let response = [];
  try {
    let departamento;
    departamento = await Departamento.findAll({
       attributes: [
        "id",
        "nombre_departamento",
      ],
    });

    res.json(departamento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
