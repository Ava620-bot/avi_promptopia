import { model, models, Schema } from "mongoose";

const promptSchema = new Schema({
  //creator of a specific prompt
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"], // having one to many relationship 1 user can have many prompts
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});

const Prompt = models.Prompt || model("Prompt", promptSchema);

export default Prompt;
