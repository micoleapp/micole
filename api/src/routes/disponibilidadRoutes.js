const { Router } = require("express");
const disponibilidadRouter = Router();

const { getDisponibilidad, createDisponibilidad, updateDisponibilidad } = require("../controllers/disponibilidadController");

disponibilidadRouter.get("/:idColegio", getDisponibilidad);
disponibilidadRouter.post("/", createDisponibilidad);
disponibilidadRouter.put("/:idColegio", updateDisponibilidad);

module.exports = disponibilidadRouter;
