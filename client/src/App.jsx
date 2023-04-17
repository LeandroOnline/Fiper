import { useState } from 'react'
import Navbar from './Components/Navbar'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
     <Navbar/>
     <Home/>
    </div>
  )
}

export default App
