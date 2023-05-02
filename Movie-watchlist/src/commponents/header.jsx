import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "../css/style.module.css";
import { useEffect, useState } from "react";
function Header() {
    const [Login, setLogin] = useState(false);
    const [AccessToken, setAccessToken] = useSessionStorage("accessToken");
    const [Session_id, setSession_id] = useSessionStorage("session_id");
    const [RequestToken, setRequestToken] = useSessionStorage("requestToken");

    const navigate = useNavigate();

    useEffect(() => {
        setLogin(false);
        if (!Session_id) {
            setLogin(true);
        }
    }, [Session_id]);

    async function handelLogUt() {
        try {
            await axios.delete(
                "https://api.themoviedb.org/4/auth/access_token",
                {
                    data: { access_token: AccessToken },
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDBv4}`,
                        "Content-Type": "application/json;charset=utf-8",
                    },
                }
            );
        } catch (error) {
            console.error(error);
        }

        /* Remove sessions */
        setAccessToken("");
        setSession_id("");
        setRequestToken("");
        sessionStorage.removeItem("requestToken");
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("session_id");

        navigate("/login");
    }

    return (
        <header className={styles.Header}>
            {/* <img src="https://picsum.photos/60" alt="" /> */}
            <Link to="/" className="header-logo">
                <img src="./assets/logo.png" alt="" />
            </Link>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {Login && (
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                    {!Login && (
                        <li>
                            <button
                                className={styles.signout}
                                onClick={handelLogUt}
                            >
                                Logga ut
                            </button>
                        </li>
                    )}
                    {!Login && (
                        <li>
                            <Link to="/profile">
                                <FontAwesomeIcon icon={faUser} size={"1x"} />
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
