import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { enableIndexedDbPersistence } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG as string);

export const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const db = getFirestore(firebaseApp)

export const fetchToken = (setTokenFound: any) => {
  return getToken(messaging, {vapidKey: process.env.REACT_APP_VAPID}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });


enableIndexedDbPersistence(db)
  .catch((err) => {
    console.log('Failed to enable persistance: ', err)
    if (err.code == 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code == 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });
