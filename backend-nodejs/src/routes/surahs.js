import express from "express"
const surahRouter = express.Router()
import surahController from "../controllers/surahController.js"
import currentRevisionController from "../controllers/currentRevisionController.js"
import UsersModel from "../models/User.js"

// initilise the surahs for the user
//TODO add authentication for this route
surahRouter.post("/initialiseSurah", async (req, res, next) => {
  try {
    const { auth_id } = req.query;
    await surahController.initialiseSurah(req, res, next),
      await currentRevisionController.initialiseCurrentRevision(req, res, next)
    // sending response after both controllers have finished updates
    const updatedUser = await UsersModel.findOne({ auth_id })
    res.status(200).send(updatedUser);
  } catch (err) {
    next(err)
  }
});

// get the surahTestHistory for a specific surah
// TODO add authentication for this route
surahRouter.get("/surahHistory", surahController.getSurahHistory);

// update strenght of the surah and 
// TODO add authentication for this route
surahRouter.put('/updateSurah', async (req, res, next) => {
  try {
    const { auth_id } = req.query;

    await surahController.updateSurah(req, res, next);
    await currentRevisionController.updateCurrentRevision(req, res, next);
    // sending response after both controllers have finished updates
    const updatedUser = await UsersModel.findOne({ auth_id })
    res.status(200).send(updatedUser);
  } catch (err) {
    next(err)
  }
});


export default surahRouter