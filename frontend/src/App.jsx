import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [jokes, setJokes] = useState([])

  useEffect(() => {
    axios
      .get('/api/jokes')
      .then((response) => {
        setJokes(response.data)
      })
      .catch((error) => {
        console.error('Error fetching jokes:', error)
      })
  }, [])

  return (
    <>
      <h2>CHAI AUR FULL STACK ☕</h2>
      <p>Total Jokes: {jokes.length}</p>

      {jokes.map((joke) => (
        <div key={joke.id} style={{ marginBottom: '15px' }}>
          <h3>{joke.title}</h3>
          <p>{joke.content}</p>
        </div>
      ))}
    </>
  )
}

export default App
