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

//------- POST A DIFICULTAD--------
router.post("/", async (req, res) => {
  const { nombre_dificultad } = req.body;
  try {
    const [dificultad, created] = await Dificultades.findOrCreate({
      where: {
        nombre_dificultad: nombre_dificultad,
      },
    });
    if (created) {
      console.log("Metodo creado exitosamente");
      dificultad.nombre_dificultad = nombre_dificultad;
      dificultad.save();
      res.status(200).json(dificultad);
    } else {
      res.status(500).json([{ error: "Dificultad existente" }]);
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

//--------------------PUT  DIFICULTAD-------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_dificultad } = req.body;
    const editedDificultad = await Dificultades.update(
      {
        nombre_dificultad: nombre_dificultad,
      },
      { where: { id: id } }
    );
    res.json(editedDificultad);
  } catch (err) {
    res.status(500).send({ err });
  }
});
//--------------------DELETE DIFICULTAD--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDificultad = await Dificultades.findOne({ where: { id: id } });
    await deleteDificultad.destroy();
    res.status(200).send({ message: "Metodo borrado" });
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = router;
