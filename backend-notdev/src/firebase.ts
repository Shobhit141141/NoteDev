import * as admin from 'firebase-admin';

const serviceAccount = require("./notedev-6eca3-firebase-adminsdk-ju8mp-5ce91b1ce3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
