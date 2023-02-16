const { Router } = require("express");
const pkg = require('../../package.json');

const authRouter = require("./authRoutes");
const userRouter = require("./userRoutes");
const router = Router();

router.get('/', (req, res) => res.json({ name: pkg.name, version: pkg.version }));
router.use("/auth", authRouter);
router.use("/users", userRouter);

module.exports = router;