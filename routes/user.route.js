const { Router } = require("express");
const { login, register, editUser, getDetails } = require("../controllers/user.js");
const { authentication } = require("../middlewares/auth.js");
const userRouter = Router();


userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.get("/details", authentication, getDetails);
userRouter.patch("/edit", authentication, editUser);

module.exports = { userRouter }