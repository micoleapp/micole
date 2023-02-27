const { Router } = require("express");
const authRouter = Router();

const { signIn, signUp, editAuthById, getAuth } = require("../controllers/authController");
const { requireAuth } = require("../middlewares/auth");

authRouter.post("/signin", signIn);
authRouter.post("/signup", signUp);
authRouter.put("/", requireAuth, editAuthById);
authRouter.get("/", getAuth);

module.exports = authRouter;