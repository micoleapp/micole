const { Router } = require("express");
const { getGradosByNivel } = require("../controllers/gradoController.js");
const router = Router();
const { Ventas, Plan_Pago } = require("../db.js");

//------- PEDIR TODOS LOS GRADOS A LA BD--------
router.get("/", async (req, res) => {
  const { idColegio } = req.query;
  try {
    let venta;
    venta = await Ventas.findAll({
      include: [
        {
          model: Plan_Pago,
          attributes: ["id", "nombre_plan_pago"],
        },
      ],
      attributes: [
        "id",
        "totalprice",
        "status",
        "months",
        "InicioPlan",
        "vencimientoPlan",
      ],
      where: {
        ColegioId: idColegio,
      },
    });

    res.json(venta);
  } catch (err) {
    res.json({ err });
  }
});

router.post("/vacantes", getGradosByNivel);

module.exports = router;
