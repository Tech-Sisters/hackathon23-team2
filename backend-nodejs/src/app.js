import express from "express"
import mongoose from "mongoose"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
//import cookieParser from "cookie-parser";
//import bodyParser from "body-parser";
//import * as admin from "firebase-admin";
import './firebaseInit.cjs';

import usersRouter from "./routes/users.js"
import surahRouter from "./routes/surahs.js"

//const serviceAccount = await import('../serviceAccountKey.json');


// this import statement results in an error, Firebase instructions use common js
//import * as serviceAccount from "../serviceAccountKey.json" // 
// workaround
import fs from 'fs';
import path from 'path'
import { fileURLToPath } from "url";

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
//const filePath = path.resolve(__dirname, 'serviceAccountKey.json');
const filePath = './serviceAccountKey.json';
//const serviceAccount = JSON.parse(fs.readFileSync(filePath, 'utf-8'))


const app = express()

//const csrfMiddleware = csrf({cookie: true}); // checking if we have the required cookie in each of our requests

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

// ---------------- FIREBASE AUTHENTICATION ------------------


//let serviceAccount; // Declare serviceAccount variable outside the try-catch block

//try {
//  const serviceAccountContent = fs.readFileSync(filePath, 'utf-8');
//  serviceAccount = JSON.parse(serviceAccountContent); // Remove 'let' here
//  console.log('this is the serviceAccount', serviceAccount);
//} catch (error) {
//  console.error('Error reading/parsing service account file:', error);
//}

// Check if serviceAccount is correctly loaded and contains required properties
//if (serviceAccount && serviceAccount.type && serviceAccount.project_id /* ...other required properties */) {
// Initialize Firebase Admin SDK with the loaded credentials
//  console.log('Type of serviceAccount:', typeof serviceAccount);
//  console.log('Content of serviceAccount:', serviceAccount);
// admin.initializeApp({
//    credential: admin.credential.cert(serviceAccount)
//  });
//} else {
//  console.error('Service account credentials are missing or invalid');
//}


//admin.initializeApp({
//  credential: admin.credential.cert(serviceAccount)
//});

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