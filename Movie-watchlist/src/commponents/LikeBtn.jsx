import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export function LikeBtn({ FilmId, Like }) {
    const [like, setLike] = useState(Like);
    
    const addFavorit = async () => {
        const session_id = window.sessionStorage.getItem("session_id");

        if (!session_id) {
            return;
        }

        const url = `https://api.themoviedb.org/3/account/{account_id}/watchlist?api_key=${import.meta.env.VITE_TMDBv3}&session_id=${session_id}`;

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const body = JSON.stringify({
            media_type: "movie",
            media_id: FilmId,
            watchlist: !like
          })

        const res = await fetch(url, { body, headers, method: "POST" })

        if (!res.ok) {
            throw Error('fetch not working')
        }

        return await res.json()
    }
    async function clickLike() {
        console.log(Like);
        addFavorit().then(() => {
            setLike(!like);
        }).catch(e => {
            console.error(e);
        })
    }


    return <FontAwesomeIcon onClick={clickLike} icon={faHeart}  color={like ? "var(--flame)" : "var(--prussian-blue)"} />
}