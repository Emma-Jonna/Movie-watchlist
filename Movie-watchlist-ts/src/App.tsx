import { Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import './App.css'
import Home from "./Pages/Home";
import { useSessionStorage } from "usehooks-ts";
import axios from "axios";
import { Top_rated, Result } from "./interface/top rated";
import Header from "./commponents/header";

export const FavoriteContext = createContext({});

export default function App() {
  let [Favorite, setFavorite] = useState<Result[]>([]);
  const [session_id, setSession_id] = useSessionStorage("session_id", "");

  useEffect(() => {
    getWatchlist();
    
    // if (session_id == "") {
    //   setFavorite([]);
    // }
  }, [session_id]);

  async function getWatchlist() {
    if (session_id) {
      const {
        data: {results},
      }:{data: Top_rated} = await axios.get(
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
        <FavoriteContext.Provider value={{Favorite, setFavorite}}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </FavoriteContext.Provider>
      </main>
    </>
  )
}