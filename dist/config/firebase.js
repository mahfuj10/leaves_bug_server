"use strict";

var admin = require('firebase-admin');

// Initialize Firebase Admin SDK with service account credentials
var serviceAccount = require('../../service-account.json'); // Replace with your service account file path
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://leavesbug-a23a5.firebaseio.com' // Replace with your Firebase database URL
});

// Access Firebase services using the admin SDK
var firestore = admin.firestore();
var auth = admin.auth();
module.exports = admin;