import mongoose from "mongoose"
import "dotenv/config"
const connectDB = mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB")
  })
  .catch(() => {
    console.log("error connecting to DB")
  })

export default connectDB
