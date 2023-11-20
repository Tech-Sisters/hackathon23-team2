import express from "express"
const surahRouter = express.Router()
import surahController from "../controllers/surahController.js"
import currentRevisionController from "../controllers/currentRevisionController.js"

// initilise the surahs for the user
//TODO add authentication for this route
surahRouter.post("/initialiseSurah",
  //surahController.initialiseSurah, //TODO re-activate this later after the initialiseCurrentRevision is working
  currentRevisionController.initialiseCurrentRevision
);

// get the surahTestHistory for a specific surah
// TODO add authentication for this route
surahRouter.get("/surahHistory", surahController.getSurahHistory);
// TODO add here also change to currentRevision

// update the surah revision history
//TODO add authentication to this route
surahRouter.put("/updateSurah", surahController.updateSurah);


export default surahRouter