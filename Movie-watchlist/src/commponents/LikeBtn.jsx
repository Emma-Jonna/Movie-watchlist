import { useEffect, useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { useSessionStorage } from "usehooks-ts";

import { FavoriteContext } from "../App";

import axios from "axios";

export function LikeBtn({ Film, Like, setLike }) {
    let { Favorite, setFavorite } = useContext(FavoriteContext);

    useEffect(() => {
        setLike(Like);
    }, [Like]);

    const [Session_id, setSession_id] = useSessionStorage("session_id", "");

    const addFavorit = async () => {
        /* If no session not try to like */
        if (!Session_id) {
            return;
        }

        const body = {
            media_type: "movie",
            media_id: Film.id,
            watchlist: !Like,
        };

        const queryParams = {
            api_key: import.meta.env.VITE_TMDBv3,
            session_id: Session_id,
        };

        axios.post(
            "https://api.themoviedb.org/3/account/{account_id}/watchlist",
            body,
            {
                headers: { "Content-Type": "application/json" },
                params: queryParams,
            }
        );
    };

    const removeFavorite = () => {
        const isAdded = Favorite.filter((val) => {
            return val.id == Film.id;
        });

        /* if Favorite already exist */
        if (isAdded.length == 1) {
            return Favorite.filter((val) => {
                return val.id != Film.id;
            });
        }

        /* if not exist */
        return [...Favorite, Film];
    };

    function clickLike() {
        if (Session_id) {
            addFavorit()
                .then(() => {
                    setFavorite(removeFavorite());
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    }

    return (
        <FontAwesomeIcon
            onClick={clickLike}
            icon={faHeart}
            color={Like ? "var(--flame)" : "var(--prussian-blue)"}
        />
    );
}
