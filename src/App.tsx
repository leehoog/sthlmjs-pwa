import React from 'react';
import './App.css';
import {useJokeApi} from "./api/getJoke";

function App() {
  const { data, getRandomJoke, loading, error } = useJokeApi()

  return (
    <div className="App">
      <div className={"mainWrapper"}>
        <h1>Joke generator 📱</h1>
        <button onClick={getRandomJoke} className={'toggleJokeButton'}>Toggle joke</button>
        <div className={'jokeContainer'}>
          <h3>{data.setup}</h3>
          <h3 style={{ marginTop: 0 }}>- {data.delivery}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
