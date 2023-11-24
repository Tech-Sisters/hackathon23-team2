import express from "express"
import surahController from "../controllers/surahController.js"
import currentRevisionController from "../controllers/currentRevisionController.js"
import UsersModel from "../models/User.js"
import authenticateUser from "../middleware/authenticateUser.js"

const surahRouter = express.Router()

// initilise the surahs for the user
surahRouter.post("/initialiseSurah", /*authenticateUser,*/ async (req, res, next) => {
  try {
    const { auth_id } = req.query;
    await surahController.initialiseSurah(req, res, next);
    await currentRevisionController.initialiseCurrentRevision(req, res, next);
    // sending response after both controllers have finished updates
    const updatedUser = await UsersModel.findOne({ auth_id })
    res.status(200).send(updatedUser);
  } catch (err) {
    next(err)
  }
});


// get the surahTestHistory for a specific surah
surahRouter.get("/surahHistory", /*authenticateUser,*/ surahController.getSurahHistory);


// update strenght of the surah, currentRevision and revisionSurahs 
surahRouter.put('/updateSurah', /*authenticateUser,*/ async (req, res, next) => {
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


surahRouter.get("/getJuzzamma", surahController.getJuzzamma)

export default surahRouter
