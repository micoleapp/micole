const { Router } = require("express");
const userRouter = Router();

const { getUsers, getUserbyId, deleteUserbyId } = require("../controllers/userController");
const { requireAdmin, requireAuth } = require("../middlewares/auth");

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserbyId);
userRouter.delete("/:id",  deleteUserbyId);

module.exports = userRouter;