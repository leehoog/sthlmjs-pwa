import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from "firebase/messaging";
import { enableIndexedDbPersistence } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore'
import {getAuth} from "firebase/auth";

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG as string)

const firebaseApp = initializeApp(firebaseConfig)

export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
const messaging = getMessaging(firebaseApp)

enableIndexedDbPersistence(db)
  .catch((err) => {
    console.log('Failed to enable persistance: ', err)
    if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
    }
  })

export const fetchToken = () => {
  return getToken(messaging, {vapidKey: process.env.REACT_APP_VAPID}).then((console.log))
}

