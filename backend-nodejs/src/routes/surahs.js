import express from "express"
import surahController from "../controllers/surahController.js"
import currentRevisionController from "../controllers/currentRevisionController.js"
import UsersModel from "../models/User.js"
import authenticateUser from "../middleware/authenticateUser.js"

const surahRouter = express.Router()

// initilise the surahs for the user
surahRouter.post("/initialiseSurah", /*authenticateUser,*/ async (req, res, next) => {
  let allowFurtherActions = true;
  try {
    const { auth_id } = req.query;
    await surahController.initialiseSurah(req, res, () => {
      allowFurtherActions = false;
      next();
    });

    if (allowFurtherActions) {
      await currentRevisionController.initialiseCurrentRevision(req, res, () => {
        allowFurtherActions = false;
        next();
      });
      // Update user and send response only if no errors occurred
      if (allowFurtherActions) {
        // sending response after both controllers have finished updates
        const updatedUser = await UsersModel.findOne({ auth_id })
        res.status(200).send(updatedUser);
      }
    }

  } catch (err) {
    next(err)
  }
})

// get the surahTestHistory for a specific surah
surahRouter.get("/surahHistory", /*authenticateUser,*/ surahController.getSurahHistory);


// update strenght of the surah, currentRevision and revisionSurahs
surahRouter.put('/updateSurah', /*authenticateUser,*/async (req, res, next) => {
  let allowFurtherActions = true;
  try {
    const { auth_id } = req.query;
    await surahController.updateSurah(req, res, () => {
      console.log("in stage 1")
      allowFurtherActions = false;
      next();
    });
    await currentRevisionController.updateCurrentRevision(req, res, () => {
      console.log("in stage 2")
      allowFurtherActions = false;
      next();
    });
    // Update user and send response only if no errors occurred
    if (allowFurtherActions) {
      // sending response after both controllers have finished updates
      const updatedUser = await UsersModel.findOne({ auth_id })
      res.status(200).send(updatedUser);
    }

  } catch (err) {
    next(err)
  }
})

surahRouter.get("/getJuzzamma", surahController.getJuzzamma)

surahRouter.get("/ayat", surahController.getAyat)

surahRouter.get("/surahStrengthCount", /*authenticateUser,*/ surahController.getSurahStrengthCount)

export default surahRouter
