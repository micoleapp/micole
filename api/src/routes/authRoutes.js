const { Router } = require("express");
const authRouter = Router();

const { signIn, signUp } = require("../controllers/authController");

authRouter.post("/", signIn);
authRouter.post("/sign-up", signUp);

module.exports = authRouter;