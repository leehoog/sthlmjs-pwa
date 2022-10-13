import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from "firebase/messaging";
import { enableIndexedDbPersistence } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG as string);

export const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const db = getFirestore(firebaseApp)

export const fetchToken = () => {
  return getToken(messaging, {vapidKey: process.env.REACT_APP_VAPID}).then((console.log))
}

/*
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
*/

enableIndexedDbPersistence(db)
  .catch((err) => {
    console.log('Failed to enable persistance: ', err)
    if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
    }
  });
