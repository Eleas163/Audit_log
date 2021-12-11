"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase-admin/app");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const authConfig = JSON.parse(`${process.env.GOOGLE_APPLICATION_CREDENTIALS}`);
// const firebaseConfig = JSON.parse(`${process.env.FIREBASE_CONFIG}`);
(0, app_1.initializeApp)({
    credential: firebase_admin_1.default.credential.cert(authConfig)
});
