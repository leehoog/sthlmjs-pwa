import React, {useEffect, useState} from 'react';
import { User } from 'firebase/auth';
import {fetchToken} from "./firebase";
import {LoginPage} from "./pages/login";
import {HomePage} from "./pages";


function App() {
  const [user, setAuth] = useState<User | null>(null)

  useEffect(() => {
    fetchToken()
  }, [])

  return (
    <div className="App">
      {
        user ?
        <HomePage />
          : <LoginPage setUser={setAuth} user={user}/>
      }
    </div>
  );
}

export default App
