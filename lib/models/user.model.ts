import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String },
  bio: { type: String },
  liked: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
  },
  watchLater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
  },
  watched: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
  },
  customLists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
