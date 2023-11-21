import { SurahSchema } from "../models/Surah.js"
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
  },
  // update happens every time after the user has completed a test
  // neeed to have if loop to compare which has the bigger number, first_surah or second_surah
  updateCurrentRevision: async (req, res) => {
    try {
      const { auth_id, revisedSurah } = req.query

      if (!auth_id) {
        return res.status(400).send({ message: "username is required as a query parameter" })
      }

      const user = await UsersModel.findOne({ auth_id })
      if (!user) {
        return res.status(404).send({ message: "User not found" })
      }

      const current = user.currentRevision[revisedSurah];


      // adding 1 to the current number to increment our value
      const findNewNumber = async () => {
        let newNumber;
        if (current >= 1 && current < 7) { //we only increment until 7 as per our 'color code', after that we start from the beginning
          newNumber = current + 1
        } else {
          newNumber = 1;
        }

        // Update the 'currentRevision' object with the new value
        user.currentRevision[revisedSurah] = newNumber;

        // update currentRevision in the database
        try {
          await user.save();
          //console.log("Updated user:", user);
          return newNumber;
        } catch (error) {
          console.error(error);
          return null;
        }
      };


      // determining strength based on our 'colour code model'
      const determineStrength = (newNumber) => {
        let strength;
        if (newNumber === 1) {
          strength = 'strong'
        } else if (newNumber === 3 || 6) {
          strength = 'medium'
        } else if (newNumber === 2 || 4 || 5 || 7) {
          strength = 'weak'
        }
        //console.log(strength);
        return strength;
      }

      // the strength doesn't need to be saved in DB, it is only used to used in the below function

      //! works until here


      const findOldestRevisionWithStrength = (user, strength) => {
        const surahTestHistories = user.juzzAmma.map(item => item.surah.surahTestHistory); //! check if this is correct!
        //console.log(surahTestHistories);

        // Flatten the array of surahTestHistory arrays into a single array
        const flattenedSurahTestHistories = [].concat(...surahTestHistories);
        console.log(flattenedSurahTestHistories)

        // Perform aggregations on the flattenedSurahTestHistories array as needed
        // For instance, finding the oldest revision with a specific strength
        const oldestRevision = flattenedSurahTestHistories
          .filter(items => items.currentStrength === strength) // Filter by specific strength if needed //! filter doesn't find the strength
        //.reduce((oldest, current) => {
        //  if (!oldest || current.date < oldest.date) {
        //    return current;
        //  }
        //  return oldest;
        //}, null);

        console.log(oldestRevision);
      }

      //const currentNumber = findCurrentNumber(user);
      const newNumber = findNewNumber();
      const strength = determineStrength(newNumber);
      const oldestRevision = findOldestRevisionWithStrength(user, strength);
      // Log or send oldestRevision as needed
      console.log("Oldest Revision:", oldestRevision);
      //const revisionSurahs = await user.revisionSurahs.save()
      res.status(200).send(oldestRevision);

    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error" });
    }


    // TODO save surah ID and name to DB

  }
}

export default CurrentRevisionController;