import * as admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();
// const serviceAccount = require("./notedev-ca409-firebase-adminsdk-wh8mj-f01a6ede4b");
const serviceAccount = JSON.parse(process.env.FIREBASE_PRIVATE_KEY || "{}");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
