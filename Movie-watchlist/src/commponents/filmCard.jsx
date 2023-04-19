import styles from "../css/style.module.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {LikeBtn} from "./LikeBtn";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";

export function FilmCard({poster_path, title, id, vote_average}) {

  let [ Like, setLike ] = useState(false)

  async function getLike() {
    const session_id = window.sessionStorage.getItem("session_id");
          
    const urlFavorite = `https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?api_key=${import.meta.env.VITE_TMDBv3}&session_id=${session_id}`;

    const resFavorite = await fetch(urlFavorite);

    const respondFavorite = await resFavorite.json();

    if (!resFavorite.ok) {
      throw Error('Can´t get favorite')
    }
    const data = respondFavorite.results.filter(val => {
      return val.title == title
    })

    return data.length >= 1 
  }

  useEffect(() => {
    getLike()
      .then(res => {
        setLike(res);
      })
      .catch(e => console.error(e));
  }, []) 

  return (
    <div className={styles.filmCard}>
      <img src={"https://image.tmdb.org/t/p/w185/" + poster_path} alt="" />
      <div className={styles.filmCardContiner}>
        <h2>{title}</h2>

        <div className={styles.rating}>
          <span>
            {vote_average}/10 <FontAwesomeIcon icon={faStar} />
          </span>
          <LikeBtn FilmId={id} Like={Like} />
        </div>
        <Link className={styles.btn} to={"/Movie/" + id}>
          See more
        </Link>
      </div>
    </div>
  );
}
