import React, {useState} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {HomePage} from "./pages";
import {LoginPage} from "./pages/login";
import { User } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getAuth } from "firebase/auth";

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG as string);

function App() {
  const [user, setUser] = useState<User | null>(null);

  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);
  const auth = getAuth(app)

  return (
    <div className="App">
      {
        user ?
          <BrowserRouter>
            <Routes>
              <Route path={'/'} element={<HomePage/>}/>
            </Routes>
          </BrowserRouter>
          :
          <LoginPage auth={auth} setUser={setUser} user={user} />
      }

    </div>
  );
}

export default App
