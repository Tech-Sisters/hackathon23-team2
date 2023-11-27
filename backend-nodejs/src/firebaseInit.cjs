// this file uses common JS and is imported into app.js

const admin = require("firebase-admin")
const fs = require("fs")
const path = require("path")
const crypto = require("crypto")

const encryptedServiceAccountPath = path.resolve(__dirname, "..", "serviceAccountKey.json.enc")

function decryptFile(filePath, password) {
  const data = fs.readFileSync(filePath)

  // Extract the salt (first 16 bytes of the file)
  const salt = data.slice(8, 16)

  // Derive key and IV using PBKDF2

  const keyIv = crypto.pbkdf2Sync(password, salt, 10000, 48, "sha256")

  // Using Uint8Array.prototype.slice.call() for compatibility
  const key = Uint8Array.prototype.slice.call(keyIv, 0, 32)
  const iv = Uint8Array.prototype.slice.call(keyIv, 32, 48)

  // Decrypt using the derived key and IV
  const encryptedContent = data.slice(16)
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv)

  let decrypted = decipher.update(encryptedContent)
  decrypted = Buffer.concat([decrypted, decipher.final()])

  return JSON.parse(decrypted.toString("utf8"))
}

let firebase

// Decrypt and use the service account
// authentication works only if this file is found
try {
  if (fs.existsSync(encryptedServiceAccountPath) && process.env.ENCRYPTION_KEY) {
    const decryptedServiceAccount = decryptFile(encryptedServiceAccountPath, process.env.ENCRYPTION_KEY)
    firebase = admin.initializeApp({
      credential: admin.credential.cert(decryptedServiceAccount)
    })
    console.log("Firebase initialized with decrypted service account.")
  } else {
    throw new Error("Encrypted service account file not found or encryption key missing.")
  }
} catch (error) {
  console.error("Error initializing Firebase with encrypted service account:", error.message)
  // Optionally, you can initialize Firebase without credentials or handle the error differently.
  // firebase = admin.initializeApp({});
}

module.exports = firebase
