const admin = require('firebase-admin');

// Initialize Firebase Admin SDK with service account credentials
const serviceAccount = require('../../service-account.json'); // Replace with your service account file path
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://leavesbug-a23a5.firebaseio.com', // Replace with your Firebase database URL
});

// Access Firebase services using the admin SDK
const firestore = admin.firestore();
const auth = admin.auth();
module.exports = admin;
