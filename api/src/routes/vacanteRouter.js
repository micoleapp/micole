const { Router } = require("express");
const vacanteRouter = Router();

const { getVacantes, getVacanteById, deleteVacanteById, postVacante } = require("../controllers/vacanteController");
const { requireAdmin, requireAuth } = require("../middlewares/auth");

vacanteRouter.get("/", getVacantes);
vacanteRouter.post("/",  postVacante);
vacanteRouter.get("/:idVacante", requireAdmin, getVacanteById);
vacanteRouter.delete("/:idVacante", requireAdmin,  deleteVacanteById);

module.exports = vacanteRouter;