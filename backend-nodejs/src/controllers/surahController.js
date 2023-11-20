import UsersModel from "../models/User.js"
import { capitalizeFirstLetter } from "./tools.js"

const SurahController = {
  initialiseSurah: async (req, res, next) => {
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
  },

  getSurahHistory: async (req, res, next) => {
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
  },

  updateSurah: async (req, res, next) => {
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
  }

}

export default SurahController;