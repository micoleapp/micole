const { Router } = require("express");
const userRouter = Router();

const { getUsers, getUserById, deleteUserById } = require("../controllers/userController");
const { requireAuth } = require("../middlewares/auth");

userRouter.get("/", requireAuth, getUsers);
userRouter.get("/:idUser", requireAuth, getUserById);
userRouter.delete("/:idUser", requireAuth,  deleteUserById);

module.exports = userRouter;