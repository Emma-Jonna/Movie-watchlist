import { useEffect, useContext } from "react";
import { Result } from "../interface/top rated";
import { useSessionStorage } from "usehooks-ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { FavoriteContext } from "../Context/Favorite";


type LikeBtnType = {
    Film: Result,
    Like: boolean,
    setLike: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LikeBtn({ Film, Like, setLike }: LikeBtnType) {
    const {Favorite, setFavorite} = useContext(FavoriteContext);

    useEffect(() => {
        setLike(Like)
    }, [Like])

    const [Session_id, setSession_id] = useSessionStorage("session_id", "")

    const addFavorite = async ({ Film, Like, setLike }: LikeBtnType) => {
        if (!Session_id) {
            return
        }

        if (!Film) {
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

        await axios.post(
            "https://api.themoviedb.org/3/account/{account_id}/watchlist",
            body,
            {
                headers: { "Content-Type": "application/json" },
                params: queryParams,
            }
        );
    };

    const removeFavorite = (Favorite:Result[]) => {
        if (Favorite) {
            const isAdded = Favorite.filter(val => {
                return val.id == Film.id
            })

            /* if Favorite already exist */
            if (isAdded?.length == 1) {
                return Favorite.filter(val => {
                    return val.id != Film.id
                })
            }
            
            return [...Favorite, Film]
        } 
        return []
    }

    function clickLink() {
        if (Session_id) {
            addFavorite({ Film, Like, setLike })
                .then(() => {
                    if (Favorite) {
                        setFavorite(removeFavorite(Favorite))
                    }
                })
                .catch((e) => {
                    console.log(e)
                })
        }
    }

    return (
        <FontAwesomeIcon
            onClick={clickLink}
            icon={faHeart}
            color={Like ? "var(--flame)" : "var(--prussian-blue)"}
        />
    )
}