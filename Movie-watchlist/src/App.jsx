import "./App.css";
import {Route, Routes} from "react-router-dom";
import {createContext, useEffect, useState} from "react";
import {useSessionStorage} from "usehooks-ts";
import axios from "axios";
import Header from "./commponents/header.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Movie from "./Pages/Movie.jsx";
import Profile from "./Pages/Profile.jsx";

export const FavoriteContext = createContext();

function App() {
  let [Favorite, setFavorite] = useState([]);
  const [session_id, setSession_id] = useSessionStorage("session_id", "");

  useEffect(() => {
    getWatchlist();
  }, [session_id]);

  async function getWatchlist() {
    if (session_id) {
      const {
        data: {results},
      } = await axios.get(
        "https://api.themoviedb.org/3/account/{account_id}/watchlist/movies",
        {
          params: {
            api_key: import.meta.env.VITE_TMDBv3,
            session_id,
          },
        }
      );
      setFavorite(results);
    }
  }

  return (
    <>
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
    </>
  );
}

export default App;
