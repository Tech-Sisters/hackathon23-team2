import express from "express"
const usersRouter = express.Router()
import UserController from "../controllers/usersController.js"
import authenticateUser from "../middleware/authenticateUser.js"


//create a new user (after successful firebase auth)
usersRouter.post("/signup", authenticateUser, UserController.createUser);

// get the user based on auth_id
usersRouter.get("/", authenticateUser, UserController.getUser);

export default usersRouter
