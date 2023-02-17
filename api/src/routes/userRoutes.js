const { Router } = require("express");
const userRouter = Router();

const { getUsers, getUserbyId, deleteUserbyId } = require("../controllers/userController");
const { requireAdmin, requireAuth } = require("../middlewares/auth");

userRouter.get("/", requireAuth, getUsers);
userRouter.get("/:id", requireAuth, getUserbyId);
userRouter.delete("/:id", requireAuth,  deleteUserbyId);

module.exports = userRouter;