import UsersModel from "../models/User.js"

const CurrentRevisionController = {
  initialiseCurrentRevision: async (req, res, next) => {
    try {
      const { auth_id } = req.query

      if (!auth_id) {
        return res.status(400).send({ message: "username is required as a query parameter" })
      }

      const user = await UsersModel.findOne({ auth_id })
      if (!user) {
        return res.status(404).send({ message: "User not found" })
      }

      // *** Initial values for currentRevision ***
      // add initial values to currentRevision array that will be updated once the user starts completing tests
      const initialCurrentRevision = {
        first_surah: 1,
        second_surah: 2
      }

      user.currentRevision = initialCurrentRevision;

      // *** Initial values for revisionSurahs ***
      // find initial values for revisionSurahs (two random surahs that have initialStrength)
      const surahsWithInitialStrength = user.juzzAmma.filter(item =>
        item && item.surahTestHistory && item.surahTestHistory.initialStrength !== null
      );

      const firstTwoSurahsWithInitialStrength = surahsWithInitialStrength.slice(0, 2);

      // extracting id and name
      const idsAndNamesOfFirstTwoSurahs = firstTwoSurahsWithInitialStrength.map(item => ({
        id: item.id,
        name: item.name
      }));

      // Inserting the IDs and names into the user.revisionSurahs object
      if (idsAndNamesOfFirstTwoSurahs.length > 0) {
        user.revisionSurahs.first_surah.id = idsAndNamesOfFirstTwoSurahs[0].id;
        user.revisionSurahs.first_surah.name = idsAndNamesOfFirstTwoSurahs[0].name;
      }

      if (idsAndNamesOfFirstTwoSurahs.length > 1) {
        user.revisionSurahs.second_surah.id = idsAndNamesOfFirstTwoSurahs[1].id;
        user.revisionSurahs.second_surah.name = idsAndNamesOfFirstTwoSurahs[1].name;
      }


      await user.save()

    } catch (error) {
      next(error)
    }

  },

  // update happens every time after the user has completed a test
  updateCurrentRevision: async (req, res, next) => {
    try {
      const { auth_id, revisedSurah } = req.query

      if (!auth_id, !revisedSurah) {
        return res.status(400).send({ message: "auth_id and revisedSurah are required as a query parameter" })
      }

      const user = await UsersModel.findOne({ auth_id })

      if (!user) {
        return res.status(404).send({ message: "User not found" })
      }

      // the current 'color code number' of either first_surah or second_surah
      const currentStrengthRating = user.currentRevision[revisedSurah];

      // incrementing strength rating
      const findNewStrengthRating = () => {
        let newStrengthRating;
        if (currentStrengthRating >= 1 && currentStrengthRating < 7) { //we only increment until 7 as per our 'color code', after that we start from the beginning
          newStrengthRating = currentStrengthRating + 1
        } else {
          newStrengthRating = 1;
        }

        return newStrengthRating
      };


      // determining strength based on the strengthRating color code model
      const determineStrength = (newStrengthRating) => {
        let strength;
        if (newStrengthRating === 1) {
          strength = 'Strong'
        } else if (newStrengthRating === 3 || newStrengthRating === 6) {
          strength = 'Medium'
        } else if (newStrengthRating === 2 || newStrengthRating === 4 || newStrengthRating === 5 || newStrengthRating === 7) {
          strength = 'Weak'
        }
        return strength;
      }


      const findOldestRevisionWithStrength = async (user, strength) => {
        const flattenedSurahTestHistories = [].concat(...user.juzzAmma);

        // these are used as back-up in case no surahs with current strenght
        const strengthsOrder = ['Weak', 'Medium', 'Strong'];
        // Filter the array based on the 'currentStrength' property
        let filteredSurahs = []; //?
        filteredSurahs = flattenedSurahTestHistories.filter((surah) =>
          surah.surahTestHistory.currentStrength === strength);

        // If no surahs are found for the currentStrength, search with other strengths
        if (filteredSurahs.length === 0) {
          for (const strength of strengthsOrder.slice(1)) {
            filteredSurahs = flattenedSurahTestHistories.filter((surah) =>
              surah.surahTestHistory.currentStrength === strength);
            if (filteredSurahs.length > 0) {
              break;
            }
          }
        }

        // Look for items with an empty revisions array as these need to be revised first
        if (filteredSurahs.length > 0) {
          const surahsWithEmptyRevisions = filteredSurahs.filter((surah) =>
            surah.surahTestHistory.revisions.length === 0);

          if (surahsWithEmptyRevisions.length > 0) {
            // Found surahs with empty revisions
            const oldestSurah = surahsWithEmptyRevisions[0];
            return oldestSurah;
            // Return the first surah with empty revisions
            // if there are no surahs without revisions, we start comparing which revision is oldest  
          } else {
            const surahsWithPopulatedRevisions = filteredSurahs.filter((surah) =>
              surah.surahTestHistory.revisions.length > 0);

            // Flatten the revisions arrays and get the oldest date
            const oldestSurah = surahsWithPopulatedRevisions
              .sort((a, b) => {
                const oldestDateA = a.surahTestHistory.revisions[0]?.date || new Date(0);
                const oldestDateB = b.surahTestHistory.revisions[0]?.date || new Date(0);
                if (oldestDateA === oldestDateB) {
                  return 0; // Dates are equal; no change in order needed
                }
                return oldestDateA - oldestDateB;
              })
              .reduce((oldest, current) => {
                const oldestDate = oldest.surahTestHistory.revisions[0]?.date || new Date(0);
                const currentDate = current.surahTestHistory.revisions[0]?.date || new Date(0);
                if (oldestDate === currentDate) {
                  return oldest; // Dates are equal; retain the oldest found so far
                }
                return oldestDate < currentDate ? oldest : current;
              });

            return oldestSurah;
          }
        }
      }


      try {
        const newStrengthRating = await findNewStrengthRating();
        const strength = determineStrength(newStrengthRating);
        const oldestRevision = await findOldestRevisionWithStrength(user, strength);

        user.currentRevision[revisedSurah] = newStrengthRating;

        user.revisionSurahs[revisedSurah].id = oldestRevision.id;
        user.revisionSurahs[revisedSurah].name = oldestRevision.name;

        await user.save();

      } catch (error) {
        next(error)
      }

    } catch (error) {
      next(error)
    }

  }
}


export default CurrentRevisionController;