import styles from "../css/style.module.css";

import { useEffect, useState, useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { LikeBtn } from "./LikeBtn";
import { Link } from "react-router-dom";
import { FavoriteContext } from "../App";

export function FilmCard({ Film }) {
    let [Like, setLike] = useState(false);

    let { Favorite, setFavorite } = useContext(FavoriteContext);

    async function getLike() {
        const data = Favorite.filter((val) => {
            return val.title == Film.title;
        });
        return data.length >= 1;
    }

    useEffect(() => {
        getLike()
            .then((res) => {
                setLike(res);
            })
            .catch((e) => console.error(e));
    }, [Favorite]);

    // return <h1></h1>
    return !Film.poster_path ? null : (
        <div className={styles.filmCard}>
            <img
                src={"https://image.tmdb.org/t/p/w185/" + Film.poster_path}
                alt=""
            />
            <div className={styles.filmCardContiner}>
                <h2>{Film.title}</h2>

                <div className={styles.rating}>
                    <span>
                        {Math.round(Film.vote_average * 10) / 10}
                        /10 <FontAwesomeIcon icon={faStar} />
                    </span>
                    <LikeBtn Like={Like} setLike={setLike} Film={Film} />
                </div>
                <Link className={styles.btn} to={"/Movie/" + Film.id}>
                    See more
                </Link>
            </div>
        </div>
    );
}
