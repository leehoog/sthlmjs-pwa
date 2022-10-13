
// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyCMxPAu-_v6lyyyaM0wDWz0pvwaF1nvJCI",
    authDomain: "pwa-demo-406a6.firebaseapp.com",
    projectId: "pwa-demo-406a6",
    storageBucket: "pwa-demo-406a6.appspot.com",
    messagingSenderId: "1062998867059",
    appId: "1:1062998867059:web:4e3ea4a49096d285bc7e06"
};


// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/logo192.png",
    };

    // eslint-disable-next-line no-restricted-globals
    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
});

