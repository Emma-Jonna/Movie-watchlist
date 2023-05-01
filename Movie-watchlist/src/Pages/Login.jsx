import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useSessionStorage } from "usehooks-ts";
import axios from "axios";

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
        <div>
            <h1>Login Works</h1>
            <button onClick={AcceptRequestToken}>Login</button>
        </div>
    );
}

export default Login;
