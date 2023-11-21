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

        user.currentRevision[revisedSurah] = newNumber;

        // update currentRevision in the database
        try {
          await user.save();
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
        return strength;
      }

      // find oldest revision based on strength
      const findOldestRevisionWithStrength = async (user, strength) => {
        const surahTestHistories = user.juzzAmma.map(item => item.surah);

        // Flatten the array of surahTestHistory arrays into a single array
        const flattenedSurahTestHistories = [].concat(...surahTestHistories);

        // Filter the array based on the 'currentStrength' property
        const filteredSurahs = flattenedSurahTestHistories.filter((surah) => surah.surahTestHistory.currentStrength === 'Weak');
        //! what about scenarios where nothing with the strength exists! 

        // Look for items with an empty revisions array as these need to be revised first
        const surahsWithEmptyRevisions = filteredSurahs.filter((surah) => surah.surahTestHistory.revisions.length === 0);
        if (surahsWithEmptyRevisions.length > 0) {
          // Found surahs with empty revisions
          console.log('Surahs with empty revisions:', surahsWithEmptyRevisions); // works, returns all surahs with empty revisions
          // Return the first surah with empty revisions
          //TODO this surah needs to be saved to revisionSurahs
          //return surahsWithEmptyRevisions[0];

          // testing

          user.revisionSurahs[revisedSurah].id = surahsWithEmptyRevisions[0].id;
          user.revisionSurahs[revisedSurah].name = surahsWithEmptyRevisions[0].name;

          try {
            await user.save();
          } catch (error) {
            console.error(error);
            return null;
          }

        } else { // if there are no surahs without revisions, we start comparing which revision is oldest
          const surahsWithPopulatedRevisions = filteredSurahs.filter((surah) => surah.surahTestHistory.revisions.length > 0);

          if (surahsWithPopulatedRevisions.length > 0) {
            // Flatten the revisions arrays and get the oldest date
            const oldestSurah = surahsWithPopulatedRevisions.reduce((oldest, current) => {
              const oldestDate = oldest.surahTestHistory.revisions.slice(-1)[0]?.date || new Date(0);
              const currentDate = current.surahTestHistory.revisions.slice(-1)[0]?.date || new Date(0);

              return oldestDate < currentDate ? oldest : current;
            });

            console.log('Oldest Surah:', oldestSurah);
            user.revisionSurahs[revisedSurah].id = oldestSurah.id;
            user.revisionSurahs[revisedSurah].name = oldestSurah.name;

            try {
              await user.save();
            } catch (error) {
              console.error(error);
              return null;
            }


            return oldestSurah;
          }
        }
      }

      //const currentNumber = findCurrentNumber(user);
      const newNumber = findNewNumber();
      const strength = determineStrength(newNumber);
      const oldestRevision = findOldestRevisionWithStrength(user, strength);
      res.status(200).send(oldestRevision);

    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error" });
    }

  }
}

export default CurrentRevisionController;