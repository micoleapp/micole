const { Router } = require("express");
const authRouter = Router();

const { signIn, signUp, getAuthById, getAuth } = require("../controllers/authController");

authRouter.post("/signin", signIn);
authRouter.post("/signup", signUp);
authRouter.get("/:id", getAuthById);
authRouter.get("/", getAuth);

module.exports = authRouter;