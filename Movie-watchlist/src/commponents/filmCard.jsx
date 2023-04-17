import styles from "../css/style.module.css";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import { LikeBtn } from "./LikeBtn";

export function FilmCard({poster_path, title, id, vote_average}) {
    return (
        <div className={styles.filmCard}>
            <img src={"https://image.tmdb.org/t/p/w185/" + poster_path} alt="" />
            <div className={styles.filmCardContiner}>
                <h2>{title}</h2>
                
                <div className={styles.rating}>
                    <span>{vote_average}/10 <FontAwesomeIcon icon={faStar} /></span>
                    <LikeBtn />
                </div>
                <a className={styles.btn} href={"/Movie?id=" + id}>See more</a>
            </div>
        </div>
    )
}