import { useState, useEffect, useContext } from "react";

import { useSessionStorage } from "usehooks-ts";

import styles from "../css/style.module.css";
import { FilmCard } from "../commponents/filmCard";
import { Navigate } from "react-router-dom";
import { FavoriteContext } from "../App";

function Profile() {
  const [Session_id, setSession_id] = useSessionStorage("session_id", "");
  let { Favorite, setFavorite } = useContext(FavoriteContext);

  if (!Session_id) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h2>Watchlist</h2>

      <div>
        <div className={styles.HomeGrid}>
          {Favorite.map((item) => (
            <FilmCard key={item.id} Film={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
