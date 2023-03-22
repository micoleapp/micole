const { Router } = require("express");
const router = Router();
const { Metodos } = require("../db.js");

//------- PEDIR TODOS LOS METODOS A LA BD--------
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

//------- POST A METODO--------
router.post("/", async (req, res) => {
  const { nombre_metodo } = req.body;
  try {
    const [metodo, created] = await Metodos.findOrCreate({
      where: {
        nombre_metodo: nombre_metodo,
      },
    });
    if (created) {
      console.log("Metodo creado exitosamente");
      metodo.nombre_metodo = nombre_metodo;
      metodo.save();
      res.status(200).json(metodo);
    } else {
      res.status(500).json([{ error: "Metodo existente" }]);
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

//--------------------PUT  UN PRODUCTO DEL METODO--------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_metodo } = req.body;
    const editedMetodo = await Metodos.update(
      {
        nombre_metodo: nombre_metodo,
      },
      { where: { id: id } }
    );
    res.json(editedMetodo);
  } catch (err) {
    res.status(500).send({ err });
  }
});
//--------------------DELETE METODO--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteMetodo = await Metodos.findOne({ where: { id: id } });
    await deleteMetodo.destroy();
    res.status(200).send({ message: "Metodo borrado" });
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = router;
