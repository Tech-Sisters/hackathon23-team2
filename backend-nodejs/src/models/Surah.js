import mongoose from "mongoose";

const SurahSchema = new mongoose.Schema({
  surah: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    surahTestHistory: {
      initialStrength: {
        type: String,
        enum: ['Strong', 'Medium', 'Weak']
      },
      currentStrength: {
        type: String,
        enum: ['Strong', 'Medium', 'Weak']
      },
      revisions: [
        {
          id: String,
          date: Date,
          strength: {
            type: String,
            enum: ['Strong', 'Medium', 'Weak']
          },
        }
      ]
    },
  }
})

const Surah = mongoose.model('Surah', SurahSchema);

export default Surah;