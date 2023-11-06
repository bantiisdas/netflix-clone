import mongoose from "mongoose";

const showDetailsSchema = new mongoose.Schema({
  showId: {
    type: String,
  },
  type: {
    type: String,
  },
  name: {
    type: String,
  },
  posterPath: {
    type: String,
  },
  backdropPath: {
    type: String,
  },
});

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
      type: showDetailsSchema,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const List = mongoose.models.List || mongoose.model("List", listSchema);

export default List;
