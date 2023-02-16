const { Router } = require("express");

const colegioRouter = require("./colegio.js");
const departamentoRouter = require("./departamento.js");
const provinciaRouter = require("./provincia.js");
const paisRouter = require("./pais.js");

const router = Router();

router.use("/colegios", colegioRouter);
router.use("/departamentos", departamentoRouter);
router.use("/provincias", provinciaRouter);
router.use("/paises", paisRouter);

router.use("/", (req, res) => {
  res.send("MI COLE API");
});

module.exports = router;
