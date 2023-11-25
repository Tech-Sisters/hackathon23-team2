// this file uses common JS and is imported into app.js

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccountPath = path.resolve(__dirname, '..', 'serviceAccountKey.json');

// authentication works only if this file is found
if (fs.existsSync(serviceAccountPath)) {
  const serviceAccount = require(serviceAccountPath);
  firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else {
  console.log('Firebase serviceAccountKey file not found, no authentication');
  firebase = admin.initializeApp({
  });
}

module.exports = firebase;