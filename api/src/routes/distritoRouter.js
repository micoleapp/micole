const { Router } = require("express");
const distritoRouter = Router();

const { getDistritos, getDistritoById, createDistrito, deleteDistritoById, updateDistrito } = require("../controllers/distritoController");

distritoRouter.get("/", getDistritos);
distritoRouter.post("/", createDistrito);
distritoRouter.get("/:id", getDistritoById);
distritoRouter.put("/:id", updateDistrito);
distritoRouter.delete("/:id", deleteDistritoById);

module.exports = distritoRouter;