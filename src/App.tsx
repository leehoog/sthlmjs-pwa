import React, {useEffect, useState} from 'react';
import {HomePage} from "./pages";
import { User } from 'firebase/auth';
import {fetchToken} from "./firebase";
import {LoginPage} from "./pages/login";


function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isTokenFound, setTokenFound] = useState(false);

  useEffect(() => {
    !isTokenFound && fetchToken(setTokenFound);
  }, [isTokenFound])

  return (
    <div className="App">
      {
        user ?
          <HomePage />
          : <LoginPage setUser={setUser} user={user}/>
      }
    </div>
  );
}

export default App
