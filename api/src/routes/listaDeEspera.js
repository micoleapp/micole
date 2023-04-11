const { Router } = require("express");
const router = Router();
const { ListaDeEspera, User, Grado, Colegio } = require("../db.js");

//------- PEDIR TODOS LOSREGISTROS DE LA LISTA--------
router.get("/", async (req, res) => {
  try {
    let lista;
    lista = await ListaDeEspera.findAll({
      include: [
        {
          model: Colegio,
          attributes: ["id", "nombre_colegio"],
        },
        {
          model: Grado,
          attributes: ["id", "nombre_grado"],
        },
        {
          model: User,
          attributes: ["nombre_responsable", "apellidos_responsable","telefono"],
        },
        {
          model:Auth,
          attributes: ["email"],
        },
      ],
      attributes: ["id", "año"],
    });

    res.json(lista);
  } catch (err) {
    res.json({ err });
  }
});

//------- PEDIR TODOS LOS REGISTROS POR USUARIO DE LA LISTA--------
router.get("/usuario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let lista;
    lista = await ListaDeEspera.findAll({
      where: { UserId: id },
    });

    res.json(lista);
  } catch (err) {
    res.json({ err });
  }
});

//------- PEDIR TODOS LOS REGISTROS POR COLEGIO DE LA LISTA--------
router.get("/colegio/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let lista;
    lista = await ListaDeEspera.findAll({
      where: { ColegioId: id },
    });

    res.json(lista);
  } catch (err) {
    res.json({ err });
  }
});

//------- POST EN LA LISTA--------
router.post("/", async (req, res) => {
  try {
    const { año, colegioId, usuarioId, gradoId } = req.body;
    const validacion = await Colegio.findOne({
      where: { id: usuarioId },
    });
    if (validacion) {
        return res.status(501).json({
        message: "Un Colegio no puede inscribirse en lista de Espera",
      });
    }
    const [lista, created] = await ListaDeEspera.findOrCreate({
      where: {
        año,
        ColegioId: colegioId,
        UserId: usuarioId,
        GradoId: gradoId,
      },
    });
    if (created) {
      await lista.setUser(usuarioId);
      await lista.setGrado(gradoId);
      await lista.setColegio(colegioId);
      res.status(200).json(lista);
    } else {
      res.status(501).json({
        message: "Ya te encuentras en la lista de espera de este Colegio",
      });
    }
  } catch (err) {
    res.status(501).json({
      message: "Error al inscribirte en la lista",
    });
  }
});

//--------------------DELETE DE LA LISTA--------------------

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRegistro = await ListaDeEspera.findOne({
      where: { id: id },
    });
    await deleteRegistro.destroy();
    res.status(200).send({ message: "Has sido borrado de la lista de espera" });
  } catch (err) {
    res.status(500).send({ err });
  }
});

module.exports = router;
