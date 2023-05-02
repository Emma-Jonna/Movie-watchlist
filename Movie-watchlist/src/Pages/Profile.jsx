import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import styles from "../css/style.module.css";
import { FilmCard } from "../commponents/filmCard";
import { FavoriteContext } from "../App";

function Profile() {
    const [MovieList, setMovieList] = useState([]);
    const [AccessToken, setAccessToken] = useSessionStorage("accessToken", "");
    const [Session_id, setSession_id] = useSessionStorage("session_id", "");
    let { Favorite, setFavorite } = useContext(FavoriteContext);

    async function getAccessToken() {
        const requestOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDBv4}`,
                "Content-Type": "application/json;charset=utf-8",
            },
            body: `{\"request_token\": ${sessionStorage.getItem(
                "requestToken"
            )}}`,
            redirect: "follow",
        };

        try {
            const response = await fetch(
                "https://api.themoviedb.org/4/auth/access_token",
                requestOptions
            );

            const result = await response.json();

            setAccessToken(result.access_token);
        } catch (error) {
            console.log("You don't have a valid access token");
        }
    }

    async function getSessionId() {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: `{\"access_token\": \"${AccessToken}\"}`,
            redirect: "follow",
        };
        const response = await fetch(
            `https://api.themoviedb.org/3/authentication/session/convert/4?api_key=${
                import.meta.env.VITE_TMDBv3
            }`,
            requestOptions
        );

        const result = await response.json();

        setSession_id(result.session_id);
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem("requestToken")) {
            getAccessToken();
        }
    }, []);

    useEffect(() => {
        if (
            !sessionStorage.getItem("requestToken") ||
            AccessToken === "undefined"
        ) {
            console.log("token dosen't exist");
            navigate("/login");
        }
    }, [sessionStorage.getItem("requestToken"), AccessToken]);

    useEffect(() => {
        if (sessionStorage.getItem("accessToken")) {
            console.log("has access");
            getSessionId();
        }
    }, [AccessToken]);

    async function getAccountInfo(params) {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        const response = await fetch(
            `https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?api_key=${
                import.meta.env.VITE_TMDBv3
            }&session_id=${Session_id}`,
            requestOptions
        );

        const result = await response.json();

        setMovieList(result.results);
    }

    useEffect(() => {
        if (Session_id) {
            getAccountInfo();
        } else {
            // navigate("/login");
        }
    }, [Session_id]);

    return !MovieList ? null : (
        <div>
            <h1 className={styles.h1}>Watchlist</h1>
            <div>
                <div className={styles.HomeGrid}>
                    {Favorite.map((item) => (
                        <FilmCard key={item.id} Film={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;
