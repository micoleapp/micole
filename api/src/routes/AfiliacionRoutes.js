const { Router } = require("express");
const afiliacionRouter = Router();

const { getAfiliacion, createAfiliacion, getAfiliacion_tipo, createAfiliacion_tipo } = require("../controllers/afiliacionController");

afiliacionRouter.get("/", getAfiliacion);
afiliacionRouter.post("/", createAfiliacion);
// Afiliacion Tipos
afiliacionRouter.get("/tipo", getAfiliacion_tipo);
afiliacionRouter.post("/tipo", createAfiliacion_tipo);

module.exports = afiliacionRouter;
