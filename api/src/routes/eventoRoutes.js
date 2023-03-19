const { Router } = require("express");
const eventoRouter = Router();

const { getEventosColegio, createEvento, getEventoById, deleteEvento, updateEvento } = require("../controllers/eventoController");

eventoRouter.get("/", getEventosColegio);
eventoRouter.post("/", createEvento);
eventoRouter.get("/:idEvento", getEventoById);
eventoRouter.put("/:idEvento", updateEvento);
eventoRouter.delete("/:idEvento", deleteEvento);

module.exports = eventoRouter;