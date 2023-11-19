import express from "express"
import mongoose from "mongoose"
import UsersModel from "../models/User.js"

const usersRouter = express.Router()

// endpoint for signup

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, email, auth_id } = req.body

    const existingUser = await UsersModel.findOne({ $or: [{ username }, { email }] })
    if (existingUser) {
      const existingField = existingUser.username === username ? "username" : "email"
      return res.status(400).send({ message: `user with this ${existingField} already exists` })
    }

    const newUser = new UsersModel(req.body)
    const savedUser = await newUser.save()

    res.status(201).send(savedUser)
  } catch (error) {
    next(error)
  }
})

export default usersRouter
