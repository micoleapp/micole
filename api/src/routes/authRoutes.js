const { Router } = require("express");
const authRouter = Router();

const { signIn, signUp, getAuthById, getAuth,putAuth } = require("../controllers/authController");

authRouter.post("/signin", signIn);
authRouter.post("/signup", signUp);
authRouter.get("/:id", getAuthById);
authRouter.get("/", getAuth);
authRouter.put("/:id", putAuth);

module.exports = authRouter;