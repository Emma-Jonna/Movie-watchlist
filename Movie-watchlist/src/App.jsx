import "./App.css";
import {Route, Routes} from "react-router-dom";
import Header from "./commponents/header.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Movie from "./Pages/Movie.jsx";
import Profil from "./Pages/Profil.jsx";

function App() {

  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
