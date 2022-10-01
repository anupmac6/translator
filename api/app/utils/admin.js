var admin = require("firebase-admin");

var serviceAccount = require("./test-94be4-firebase-adminsdk-8fhve-f395a4cacf.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = { admin, db };
