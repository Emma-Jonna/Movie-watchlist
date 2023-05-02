import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import axios from "axios";
import "../css/login.css";

function Login() {
    /* Get / set sessions state */
    const [RequestToken, setRequestToken] = useSessionStorage("requestToken");
    const [AccessToken, setAccessToken] = useSessionStorage("accessToken");
    const [Session_id, setSession_id] = useSessionStorage("session_id");
    const baseUrl = window.location.origin;

    /* TMDB urls */
    const TMDBv4URL = "https://api.themoviedb.org/4";
    const TMDBv3URL = "https://api.themoviedb.org/3";

    async function getRequestToken() {
        const headers = {
            Authorization: `Bearer ${import.meta.env.VITE_TMDBv4}`,
            "Content-Type": "application/json;charset=utf-8",
        };

        try {
            const {
                data: { request_token },
            } = await axios.post(
                `${TMDBv4URL}/auth/request_token`,
                { redirect_to: `${baseUrl}/profile` }, // Axios body
                { headers }
            ); // Axios options

            setRequestToken(request_token);
        } catch (error) {
            console.error(error);
        }
    }

    const AcceptRequestToken = () => {
        window.location.href = `https://www.themoviedb.org/auth/access?request_token=${RequestToken}`;
    };

    useEffect(() => {
        getRequestToken();
    }, []);

    if (Session_id) {
        return <Navigate to="/" />;
    }

    return (
        <article className="login-wrapper">
            <div className="login-container">
                <div className="login-text">
                    <h1>TMDB watchlist</h1>
                </div>
                <button onClick={AcceptRequestToken}>Login</button>
            </div>
        </article>
    );
}

export default Login;
