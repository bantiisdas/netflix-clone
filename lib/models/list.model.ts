import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  listType: { type: String, required: true },
  visibility: { type: Boolean, default: false },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hasAcess: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  shows: [
    {
      showId: String,
      type: String,
      name: String,
      posterPath: String,
      backdropPath: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const List = mongoose.models.List || mongoose.model("List", listSchema);

export default List;
