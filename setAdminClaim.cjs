const admin = require("firebase-admin");

// Updated to match your actual service account key file name
const serviceAccount = require("./essay-embassy-firebase-adminsdk-fbsvc-8b64a3a940.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Set the UID to the provided user
const uid = "4iWA2b7bQZaxUz74Tq2EIx8egXj1";

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(`Admin claim set for user: ${uid}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error setting admin claim:", error);
    process.exit(1);
  }); 