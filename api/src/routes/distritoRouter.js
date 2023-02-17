const { Router } = require("express");
const distritoRouter = Router();

const { getDistritos, getDistritobyId } = require("../controllers/distritoController");

distritoRouter.get("/", getDistritos);
distritoRouter.get("/:id", getDistritobyId);

module.exports = distritoRouter;