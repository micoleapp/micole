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

//------- POST A INFRAESTRUCTURA-------
router.post("/", async (req, res) => {
  const { nombre_infraestructura } = req.body;
  try {
    const [infraestructura, created] = await Infraestructura.findOrCreate({
      where: {
        nombre_infraestructura: nombre_infraestructura,
      },
    });
    if (created) {
      console.log("Infra creado exitosamente");
      infraestructura.nombre_infraestructura = nombre_infraestructura;
      infraestructura.slug = slug;
      infraestructura.imagen = imagen;
      infraestructura.save();
      res.status(200).json(infraestructura);
    } else {
      res.status(500).json([{ error: "Infraestructura existente" }]);
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

//--------------------PUT  INFRAESTRUCTURA--------------------
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_infraestructura, slug, imagen } = req.body;
    const editedInfra = await Infraestructura.update(
      {
        nombre_infraestructura: nombre_infraestructura,
        slug: slug,
        imagen: imagen,
      },
      { where: { id: id } }
    );
    res.json(editedInfra);
  } catch (err) {
    res.status(500).send({ err });
  }
});
//--------------------DELETE UNA INFRAESTRUCTURA--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteInfra = await Infraestructura.findOne({ where: { id: id } });
    await deleteInfra.destroy();
    res.status(200).send({ message: "Infraestructura borrada" });
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = router;
