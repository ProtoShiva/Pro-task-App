import mongoose from "mongoose"
import { Schema } from "mongoose"

const inputSchema = new Schema({
  id: String,
  value: String,
  checked: Boolean
})
const checkSchema = new Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    priority: String,
    status: {
      type: String,
      enum: ["To Do", "BACKLOG", "PROGRESS", "DONE"],
      default: "To Do"
    },
    duedate: { type: String, default: "" },
    inputs: [inputSchema],
    checked: Boolean
  },
  { timestamps: true }
)

const CheckModel = mongoose.model("Check", checkSchema)

export default CheckModel
