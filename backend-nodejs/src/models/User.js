import mongoose from "mongoose";
import Surah from './Surah';

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    lowercase: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  auth_id: {
    type: String,
    required: false,
  },
  juzzAmma: {
    type: [Surah],
    required: true,
  },
  currentRevision: {
    first_surah: {
      type: Number,
      required: true
    },
    second_surah: {
      type: Number,
      required: true
    },
    required: false // currentRevision only exists if the user has selected strength for one or more surahs
  }
});

const User = mongoose.model('User', UserSchema);

export default User;