import UsersModel from "../models/User.js"

const CurrentRevisionController = {
  initialiseCurrentRevision: async (req, res) => {
    try {
      const { auth_id } = req.query

      if (!auth_id) {
        return res.status(400).send({ message: "username is required as a query parameter" })
      }

      const user = await UsersModel.findOne({ auth_id })
      if (!user) {
        return res.status(404).send({ message: "User not found" })
      }

      // add initial values to currentRevision array that will be updated once the user starts completing tests
      const initialCurrentRevision = {
        first_surah: 1,
        second_surah: 2
      }

      user.currentRevision = initialCurrentRevision;

      const updatedUser = await user.save()

      res.status(200).send(updatedUser)

    } catch (error) {
      console.error("Error initializing current revision:", error);
      res.status(500).json({ message: "Internal server error" });
    }
    // update happens every time after the user has completed a test
    // neeed to have if loop to compare which has the bigger number, first_surah or second_surah
    //TODO updatecurrentRevision:

    // this is where all the business logic is needed. We need several if loops, making also sure that scenarios where a user doesn't have surahs in certain
    // category are not missed
    //TODO getCurrentRevision:
    // if loops if 1 -=> strong,
    // if 2, 4, 5 or 7 --> weak
    // further if loop ---> if strong not exist, select medium etc....
  },

}

export default CurrentRevisionController;