import express from "express"
import mongoose from "mongoose"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import './firebaseInit.cjs';

import usersRouter from "./routes/users.js"
import surahRouter from "./routes/surahs.js"



const app = express()


const port = process.env.PORT || 3004


// ---------------- WHITELIST FOR CORS ------------------

const corsOptions = {
  cors: {
    origin: process.env.FE_URL || process.env.FE_PROD_URL || process.env.FE_VERCEL_URL,
    // origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }
}

app.use(express.json())
app.use(cors(corsOptions))


app.use("/users", usersRouter)
app.use("/surahs", surahRouter)


// ---------------- SERVER ------------------

mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_URL)

mongoose.connection.on("connected", () => {
  console.log("connected to mongo!")
  app.listen(port, () => {
    console.table(listEndpoints(app))
    console.log("server is running on port:", port)
  })
})