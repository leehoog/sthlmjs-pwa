import {useCallback, useState} from "react";
import {db} from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const HomePage = () => {
  const [posts, setPosts] = useState<any[]>([])

  const getPosts = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "posts"))
    setPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()})))
  }, [])

  return (
    <div className="App">
      <h1>Home</h1>
      <button onClick={getPosts}>Get posts</button>
      {
        posts.map(post =>
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </div>
        )
      }
    </div>
  )
}