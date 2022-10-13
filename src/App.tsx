import React, {useEffect, useState} from 'react';
import {fetchToken} from "./firebase";
import {LoginPage} from "./pages/login";
import {HomePage} from "./pages";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    fetchToken()
  }, [])

  return (
    <div className="App">
      {
        isLoggedIn ?
        <HomePage />
          : <LoginPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>
      }
    </div>
  );
}

export default App
