import UsersModel from "../models/User.js"
import { capitalizeFirstLetter } from "./tools.js"
import axios from "axios"

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

      if (juzzAmma === undefined || juzzAmma === null) {
        return res.status(400).send({ message: "juzzAmma is required in the request body" })
      }

      // Update juzzAmma for the found user
      user.juzzAmma = juzzAmma
      await user.save()
    } catch (error) {
      next(error)
    }
  },

  getSurahHistory: async (req, res, next) => {
    try {
      const { auth_id, surahId } = req.query
      console.log("auth, surah", auth_id, surahId)

      if (!auth_id || !surahId) {
        return res.status(400).send({ message: "auth_id and surahId are required" })
      }

      const user = await UsersModel.findOne({ auth_id })
      if (!user) {
        return res.status(404).send({ message: "User not found" })
      }

      const surah = user.juzzAmma.find((surah) => surah.id === surahId)
      if (!surah.id) {
        return res.status(404).send({ message: "Surah not found" })
      }

      res.status(200).send(surah)
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

      const surahIndex = user.juzzAmma.findIndex((surah) => surah.id === surahId)
      if (surahIndex === -1) {
        return res.status(404).send({ message: "Surah not found" })
      }
      // Update currentStrength and add a new revision
      let strengthCapitalised = capitalizeFirstLetter(strength)
      user.juzzAmma[surahIndex].surahTestHistory.currentStrength = strengthCapitalised
      user.juzzAmma[surahIndex].surahTestHistory.revisions.unshift({
        date: new Date(), // Current date
        strength: strengthCapitalised
      })

      await user.save()
    } catch (error) {
      next(error)
    }
  },

  getJuzzamma: async (req, res, next) => {
    try {
      const response = await axios.get("https://api.quran.com/api/v4/chapters")
      const surahs = response.data.chapters

      // mapping only the surah id and the name
      const juzzamma = surahs
        .filter((surah) => surah.id >= 78 && surah.id <= 114)
        .map((surah) => {
          return {
            id: surah.id,
            name: surah.name_simple,
            surahTestHistory: {
              initialStrength: null,
              currentStrength: null,
              revisions: []
            }
          }
        })

      res.json(juzzamma)
    } catch (error) {
      next(error)
    }
  },

  getAyat: async (req, res, next) => {
    const { surahId } = req.query
    try {
      const response = await axios.get(
        `https://api.quran.com/api/v4/verses/by_chapter/${surahId}?fields=text_imlaei&per_page=50`
      )
      const ayat = response.data.verses

      res.send(ayat)
    } catch (error) {
      next(error)
    }
  }
}

export default SurahController
