import express from "express"
import mongoose from "mongoose"
import listEndpoints from "express-list-endpoints"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const port = process.env.PORT || 3004

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected")
    console.log("backend is running on port:", port)
    console.table(listEndpoints(app))
  })
  .catch((err) => console.error("Database connection error: " + err))
