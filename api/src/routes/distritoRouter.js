const { Router } = require("express");
const distritoRouter = Router();

const { getDistritos, getDistritoById, createDistrito, deleteDistritoById } = require("../controllers/distritoController");

distritoRouter.get("/", getDistritos);
distritoRouter.post("/", createDistrito);
distritoRouter.get("/:id", getDistritoById);
distritoRouter.delete("/:id", deleteDistritoById);

module.exports = distritoRouter;