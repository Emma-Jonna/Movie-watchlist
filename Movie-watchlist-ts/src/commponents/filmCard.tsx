import styles from "../css/style.module.css";

import { FavoriteContext } from "../App";
import { Result } from "../interface/top rated";

import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LikeBtn from "./LikeBtn";

export default function FilmCard({ Film }: { Film: Result }) {
    const [Like, setLike] = useState(false);

    const { Favorite, setFavorite } = useContext(FavoriteContext);

    async function getLike (Favorite: Result[]) {
        const data = Favorite.filter(val => {
            return val.title == Film.title;
        });

        return data.length >= 1
    }

    useEffect(() => {
        getLike(Favorite)
            .then(res => {
                setLike(res)
            })
            .catch(e => console.error(e))
    }, [Favorite])

    return (
        <div className={styles.filmCard}>
            {Film.poster_path ? (
                <img src={"https://image.tmdb.org/t/p/w185/" + Film.poster_path} alt="" />
            ) : (
                <img
                    src="./assets/No poster.png"
                    alt="The film has no poster"
                />
            )}
            <div className={styles.filmCardContiner}>
                <h2>{Film.title}</h2>

                <div className={styles.rating}>
                    <span>
                        {Math.round(Film.vote_average * 10) / 10}
                        /10 <FontAwesomeIcon icon={faStar} />
                    </span>
                    <LikeBtn Like={Like} setLike={setLike} Film={Film} />
                </div>
                <Link className={styles.btn} to={`/Movie/${Film.id}`}>See more</Link>
            </div>
        </div>
    )
}