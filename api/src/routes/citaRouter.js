const { Router } = require("express");
const citaRouter = Router();

const { getCitas, getCitaById, createCita, changeStatusCita, changeActivoCita, deleteCita } = require("../controllers/citaController");
const { requireAuth } = require("../middlewares/auth");

citaRouter.get("/", getCitas);
citaRouter.get("/:idCita", getCitaById);
citaRouter.post("/", createCita);
citaRouter.put("/:idCita", changeStatusCita);
citaRouter.put("/activo/:idCita", changeActivoCita);
citaRouter.delete("/:idCita", deleteCita);

module.exports = citaRouter;