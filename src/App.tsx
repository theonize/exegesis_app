import { useState } from 'react'
import Main from './com/Main'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return <>
    <header>
      <h1>Exegesis App</h1>
    </header>

    <Main />

    <footer>
      &copy; 2025 Theonize Exegesis Repository
    </footer>
  </>
}

export default App
