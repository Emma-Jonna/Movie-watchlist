import { useState } from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom";
import Header from "./commponents/header.jsx";
import Home from "./Pages/Home.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
          <Header />
          <main>

              <Routes>
                  <Route path="/" element={<Home />} />
                  {/*<Route path="/login" element={<Login isPlaying={playing} />} />*/}
                  {/*<Route path="*" element={<NotFound/>} />*/}
              </Routes>
          </main>
      </div>
  )
}

export default App
