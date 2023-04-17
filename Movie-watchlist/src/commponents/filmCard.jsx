import styles from "../css/style.module.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

export function FilmCard({poster_path, title, id, vote_average}) {
    return (
        <div className={styles.filmCard}>
            <img src={"https://image.tmdb.org/t/p/w185/" + poster_path} alt="" />
            <h2>{title}</h2>
            <span>{vote_average}/10 <FontAwesomeIcon icon={faStar} /></span>
            <a href={"/Movie?id=" + id}>See more</a>
        </div>
    )
}