import {useState} from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import Header from "./commponents/header.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Movie from "./Pages/Movie.jsx";
import Profil from "./Pages/Profil.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
      <div>
          <Header />
          <main>

              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Movie" element={<Movie />} />
                  <Route path="/Profil" element={<Profil />}/>
                  <Route path="/Login" element={<Login />}/>
              </Routes>
          </main>
      </div>
  )
}

export default App;
