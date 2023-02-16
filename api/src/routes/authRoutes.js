const { Router } = require("express");
const authRouter = Router();

const { signIn, signUp, getAuthById } = require("../controllers/authController");

authRouter.post("/signin", signIn);
authRouter.post("/signup", signUp);
authRouter.get("/:id", getAuthById);

module.exports = authRouter;