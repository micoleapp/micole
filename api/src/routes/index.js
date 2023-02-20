const { Router } = require("express");
const pkg = require("../../package.json");

const authRouter = require("./authRoutes.js");
const colegioRouter = require("./colegio.js");
const departamentoRouter = require("./departamento.js");
const provinciaRouter = require("./provincia.js");
const distritoRouter = require("./distritoRouter.js");
const paisRouter = require("./pais.js");
const userRouter = require("./userRoutes.js");
const categoriaRouter = require("./categoria.js");
const vacanteRouter = require("./vacanteRouter.js");

const router = Router();

router.use("/colegios", colegioRouter);
router.use("/departamentos", departamentoRouter);
router.use("/provincias", provinciaRouter);
router.use("/distritos", distritoRouter);
router.use("/paises", paisRouter);
router.use("/categorias", categoriaRouter);
router.use("/vacantes", vacanteRouter);

router.get("/", (req, res) =>
  res.json({ name: pkg.name, version: pkg.version })
);
router.use("/auth", authRouter);
router.use("/users", userRouter);

module.exports = router;
