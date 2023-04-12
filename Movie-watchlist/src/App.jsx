import { useState } from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom";
import Header from "./commponents/header.jsx";
import Home from "./Pages/Home.jsx"
import Movie from "./Pages/Movie.jsx";
import Profil from "./Pages/Profil.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
          <Header />
          <main>

              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Movie" element={<Movie />} />
                  <Route path="/Profil" element={<Profil />}/>
              </Routes>
          </main>
      </div>
  )
}

export default App
