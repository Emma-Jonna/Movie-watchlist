import styles from "../css/style.module.css";

import { useEffect, useState, useContext } from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {LikeBtn} from "./LikeBtn";
import {Link} from "react-router-dom";
import { FavoriteContext } from "../App";

export function FilmCard({ poster_path, title, id, vote_average}) {

  let [ Like, setLike ] = useState(false)
  const session_id = window.sessionStorage.getItem("session_id");
  const Favorite = useContext(FavoriteContext);
  
  async function getLike() {
    const data = Favorite.filter(val => {
      return val.title == title
    })
    return data.length >= 1 
  }
  
  useEffect(() => {
    
    if (session_id) {
      getLike()
        .then(res => {
          setLike(res);
        })
        .catch(e => console.error(e));
    }
  }, [Favorite]) 

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
