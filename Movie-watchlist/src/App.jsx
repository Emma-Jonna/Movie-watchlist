import "./App.css";
import {Route, Routes} from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import Header from "./commponents/header.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Movie from "./Pages/Movie.jsx";
import Profile from "./Pages/Profile.jsx";

export const FavoriteContext = createContext(); 

function App() {
  let [ Favorite, setFavorite ] = useState([])

  useEffect(() => {
    const session_id = window.sessionStorage.getItem("session_id");
      const urlFavorite = `https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?api_key=${import.meta.env.VITE_TMDBv3}&session_id=${session_id}`;
      fetch(urlFavorite)
          .then(res => res.json())
          .then(data => setFavorite(data.results));
  }, [])

  return (
    <div>
      <Header />
      <main>
      <FavoriteContext.Provider value={Favorite}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        </FavoriteContext.Provider>
      </main>
    </div>
  );
}

export default App;
