import express from "express"
const surahRouter = express.Router()
import surahController from "../controllers/surahController.js"

// initilise the surahs for the user
//TODO add authentication for this route
surahRouter.post("/initialiseSurah", surahController.initialiseSurah)

// get the surahTestHistory for a specific surah
// TODO add authentication for this route
surahRouter.get("/surahHistory", surahController.getSurahHistory)

// update the surah revision history
//TODO add authentication to this route
surahRouter.put("/updateSurah", surahController.updateSurah)

surahRouter.get("/getJuzzamma", surahController.getJuzzamma)

export default surahRouter
