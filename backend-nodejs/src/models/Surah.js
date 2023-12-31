import mongoose from "mongoose"

const SurahSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surahTestHistory: {
    initialStrength: {
      type: String,
      enum: ["Strong", "Medium", "Weak"]
    },
    currentStrength: {
      type: String,
      enum: ["Strong", "Medium", "Weak"]
    },
    revisions: [
      {
        date: Date,
        strength: {
          type: String,
          enum: ["Strong", "Medium", "Weak"]
        }
      }
    ]
  }
})
export { SurahSchema } // Export the schema
export default mongoose.model("Surah", SurahSchema)
// const Surah = mongoose.model("Surah", SurahSchema)

// export default Surah
