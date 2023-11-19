import express from "express"
import mongoose from "mongoose"
import UsersModel from "../models/User.js"
import { capitalizeFirstLetter } from "../controllers/tools.js"

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
    console.log("Query Parameters For Getting User", req.query)

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

// initilise the surahs for the user
usersRouter.post("/initialiseSurah", async (req, res, next) => {
  try {
    const { auth_id } = req.query // Get auth_id from query parameters

    const { juzzAmma } = req.body
    console.log("Query Parameters For Initialising Surahs", req.query)
    console.log("req.body", req.body)

    if (!auth_id) {
      return res.status(400).send({ message: "auth_id is required as a query parameter" })
    }

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

// get the surahTestHistory for a specific surah
usersRouter.get("/surahHistory", async (req, res, next) => {
  try {
    const { auth_id, surahId } = req.query

    if (!auth_id || !surahId) {
      return res.status(400).send({ message: "auth_id and surahId are required" })
    }

    const user = await UsersModel.findOne({ auth_id })
    if (!user) {
      return res.status(404).send({ message: "User not found" })
    }

    const surah = user.juzzAmma.find((s) => s.surah.id === surahId)
    if (!surah) {
      return res.status(404).send({ message: "Surah not found" })
    }

    res.status(200).send(surah.surah.surahTestHistory)
  } catch (error) {
    next(error)
  }
})

// update the surah revision history
usersRouter.put("/updateSurah", async (req, res, next) => {
  try {
    const { auth_id, surahId } = req.query
    const { strength } = req.body

    if (!auth_id || !surahId || !strength) {
      return res.status(400).send({ message: "auth_id, surahId, and strength are required" })
    }

    const user = await UsersModel.findOne({ auth_id })
    if (!user) {
      return res.status(404).send({ message: "User not found" })
    }

    const surahIndex = user.juzzAmma.findIndex((s) => s.surah.id === surahId)
    if (surahIndex === -1) {
      return res.status(404).send({ message: "Surah not found" })
    }

    // Update currentStrength and add a new revision
    let strengthCapitalised = capitalizeFirstLetter(strength)
    user.juzzAmma[surahIndex].surah.surahTestHistory.currentStrength = strengthCapitalised
    user.juzzAmma[surahIndex].surah.surahTestHistory.revisions.unshift({
      date: new Date(), // Current date
      strength: strengthCapitalised
    })

    const updatedUser = await user.save()
    res.status(200).send(updatedUser)
  } catch (error) {
    next(error)
  }
})

export default usersRouter
