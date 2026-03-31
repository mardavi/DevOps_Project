import { Schema, model } from "mongoose";

const featureRequestSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "open",
      enum: ["open", "in progress", "completed"],
    },
  },
  { timestamps: true },
);

const FeatureRequest = model("FeatureRequest", featureRequestSchema);

export default FeatureRequest;
