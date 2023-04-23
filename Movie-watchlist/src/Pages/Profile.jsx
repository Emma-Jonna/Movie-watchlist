import React, {useState, useEffect} from "react";

import {useSessionStorage} from "usehooks-ts";

import styles from "../css/style.module.css";
import {FilmCard} from "../commponents/filmCard";
import {json, Navigate} from "react-router-dom";

function Profile() {
  const [MovieList, setMovieList] = useState([]);
  const [Session_id, setSession_id] = useSessionStorage("session_id", "");

  if (!window.sessionStorage.getItem("session_id")) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?api_key=${
        import.meta.env.VITE_TMDBv3
      }&session_id=${Session_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setMovieList(result.results))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div>
      <h2>Watchlist</h2>

      <div>
        <div className={styles.HomeGrid}>
          {MovieList.map((item) => (
            <FilmCard
              key={item.id}
              poster_path={item.poster_path}
              title={item.title}
              id={item.id}
              vote_average={Math.round(item.vote_average * 10) / 10}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
