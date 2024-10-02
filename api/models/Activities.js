import mongoose from "mongoose";
const ActivitiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    dateActivity: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    capability: {
        type: Number,
        required: true,
      },
  },
  { timestamps: true }
);

export default mongoose.model("Activities", ActivitiesSchema);