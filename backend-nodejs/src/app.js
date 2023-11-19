import express from "express"
import mongoose from "mongoose"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import usersRouter from "./routes/index.js"

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

// app.get("/test", (req, res) => {
//   res.send("Test route working")
// })
app.use("/users", usersRouter)

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

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("MongoDB Connected")
//     console.log("backend is running on port:", port)
//     console.table(listEndpoints(app))
//   })
//   .catch((err) => console.error("Database connection error: " + err))
