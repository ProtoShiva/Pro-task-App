import mongoose from "mongoose"
import { Schema } from "mongoose"

const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String
  },
  { timestamps: true }
)

const UserModel = mongoose.model("User", UserSchema)

export default UserModel
