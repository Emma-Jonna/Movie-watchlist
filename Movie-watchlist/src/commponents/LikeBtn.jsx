import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";

import { useSessionStorage } from "usehooks-ts";

import axios from "axios";

export function LikeBtn({ FilmId, Like }) {
    const [like, setLike] = useState();

    useEffect(() => {
        setLike(Like);
    }, [Like])
    
    const [Session_id, setSession_id] = useSessionStorage('session_id', "");
    
    const addFavorit = async () => {

        /* If no session not try to like */
        if (!Session_id) {
            return;
        }

        const body = {
            media_type: "movie",
            media_id: FilmId,
            watchlist: !like
        }

        const queryParams = {
            api_key: import.meta.env.VITE_TMDBv3,
            session_id: Session_id
        }

        axios.post("https://api.themoviedb.org/3/account/{account_id}/watchlist", body , {
            headers: { "Content-Type": "application/json" },
            params: queryParams
          })
    }
    function clickLike() {
        if (Session_id) {
            addFavorit().then(() => {
                setLike(!like);
            }).catch(e => {
                console.error(e);
            })
        }
    }


    return <FontAwesomeIcon onClick={clickLike} icon={faHeart}  color={like ? "var(--flame)" : "var(--prussian-blue)"} />
}