import express from "express"
const usersRouter = express.Router()
import UserController from "../controllers/usersController.js"

//create a new user (after successful firebase auth)
usersRouter.post("/signup", UserController.createUser);

// get the user based on auth_id
usersRouter.get("/", UserController.getUser);
//TODO add here also getCurrentRevision

export default usersRouter
