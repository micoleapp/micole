const { Router } = require("express");
const router = Router();
const {Provincia} = require("../db.js");
// const getComponentData = require("../funciones/getComponentData.js");
// const ratingProm = require("../funciones/ratingProm.js");

//------- PEDIR TODOS LOS COLEGIOS A LA BD--------
router.get("/", async (req, res) => {
  //   const { brand, category, priceMin, priceMax } = req.query;
  let response = [];
  try {
    let provincia;
    provincia = await Provincia.findAll({
       attributes: [
        "id",
        "nombre_provincia",
      ],
    });

    res.send(provincia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
