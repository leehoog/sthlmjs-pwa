import {useCallback, useEffect, useState} from "react";

interface Joke {
  setup: string
  delivery: string
}

export const useJokeApi = () => {
  const [data, setData] = useState<Joke>({ setup: '', delivery: '' })
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const getRandomJoke = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
      const data = await res.json()
      const joke = {
        delivery: data.joke ? data.joke : data.delivery,
        setup: data.setup
      }
      setData(joke)
      localStorage.setItem('joke', JSON.stringify(joke))
    } catch(e) {
      console.log("Failed to get joke: ", e)
      setError(new Error('Failed to get joke'))
    }
    finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getRandomJoke()
  }, [getRandomJoke])

  return {
    data,
    loading,
    error
  }
}