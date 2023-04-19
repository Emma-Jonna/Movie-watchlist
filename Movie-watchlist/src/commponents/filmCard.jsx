import styles from "../css/style.module.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {LikeBtn} from "./LikeBtn";
import {Link} from "react-router-dom";

export function FilmCard({poster_path, title, id, vote_average}) {
  return (
    <div className={styles.filmCard}>
      <img src={"https://image.tmdb.org/t/p/w185/" + poster_path} alt="" />
      <div className={styles.filmCardContiner}>
        <h2>{title}</h2>

        <div className={styles.rating}>
          <span>
            {vote_average}/10 <FontAwesomeIcon icon={faStar} />
          </span>
          <LikeBtn />
        </div>
        <Link className={styles.btn} to={"/Movie/" + id}>
          See more
        </Link>
      </div>
    </div>
  );
}
