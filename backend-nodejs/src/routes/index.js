import express from "express"
import mongoose from "mongoose"
import UsersModel from "../models/User.js"

const usersRouter = express.Router()

//create a new user (after successful firebase auth)
usersRouter.post("/signup", async (req, res, next) => {
  try {
    const { username, email, auth_id } = req.body
    console.log("req.body", req.body)

    const existingUsername = await UsersModel.findOne({ username })
    if (existingUsername) {
      return res.status(400).send({ message: "user with this username already exists" })
    }

    const newUser = new UsersModel(req.body)
    const savedUser = await newUser.save()

    res.status(201).send(savedUser)
  } catch (error) {
    next(error)
  }
})

// get the user based on auth_id
usersRouter.get("/", async (req, res, next) => {
  try {
    const { auth_id } = req.query // Get auth_id from query parameters
    console.log("Query Parameters", req.query)

    if (!auth_id) {
      return res.status(400).send({ message: "auth_id is required" })
    }

    const user = await UsersModel.findOne({ auth_id })
    if (!user) {
      return res.status(404).send({ message: "User not found" })
    }

    res.status(200).send(user)
  } catch (error) {
    next(error)
  }
})

usersRouter.post("/initialiseSurah", async (req, res, next) => {
  try {
    const { auth_id, juzzAmma } = req.body
    console.log("req.body", req.body)

    const user = await UsersModel.findOne({ auth_id })
    if (!user) {
      return res.status(404).send({ message: "User not found" })
    }

    // Update juzzAmma for the found user
    user.juzzAmma = juzzAmma
    const updatedUser = await user.save()
    res.status(200).send(updatedUser)
  } catch (error) {
    next(error)
  }
})

export default usersRouter
