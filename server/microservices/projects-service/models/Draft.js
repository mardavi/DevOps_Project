import { Schema, model } from "mongoose";

const draftSchema = new Schema(
  {
    featureId: {
      type: Schema.Types.ObjectId,
      ref: "FeatureRequest",
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    version: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
);

const Draft = model("Draft", draftSchema);

export default Draft;
