import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

// API route
app.get('/api/jokes', (req, res) => {
  const jokes = [
    {
      id: 1,
      title: 'DSA Joke',
      content: 'Why did the array break up with the linked list? Because it felt too attached.'
    },
    {
      id: 2,
      title: 'DSA Humor',
      content: 'Why do programmers love binary search? Because it always halves their problems.'
    },
    {
      id: 3,
      title: 'Programmer Joke',
      content: 'Why do programmers prefer dark mode? Because light attracts bugs.'
    },
    {
      id: 4,
      title: 'JavaScript Joke',
      content: 'Why was the JavaScript developer sad? Because he didn’t know how to null his feelings.'
    },
    {
      id: 5,
      title: 'Backend Joke',
      content: 'Backend developers don’t sleep, they just wait for responses.'
    }
  ]

  res.json(jokes)
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`)
})
