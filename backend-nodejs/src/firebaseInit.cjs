const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Get the current working directory
console.log('Current working directory:', process.cwd());

// Construct the absolute path to the serviceAccountKey.json file
const serviceAccountPath = path.resolve(__dirname, '..', 'serviceAccountKey.json');

if (fs.existsSync(serviceAccountPath)) {
  const serviceAccount = require(serviceAccountPath);
  firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else {
  console.log('Service account key file not found at:', serviceAccountPath);
  // Handle authentication being disabled or troubleshoot path issues
  firebase = admin.initializeApp({
    // Provide default configurations or leave it empty as needed
  });
}

module.exports = firebase;