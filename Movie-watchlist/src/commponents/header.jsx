import {Link} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

import styles from "../css/style.module.css";
import { useEffect, useState } from "react";

function Header () {

    const [Login, setLogin] = useState(false);

    const session_id = window.sessionStorage.getItem('session_id');
    const access_token = window.sessionStorage.getItem('accessToken');

    console.log(session_id);
    
    useEffect(() => {
        if (!session_id) {
            setLogin(true)
        }
    })

    const handelLoginBtn = async () => {
        const url = "https://api.themoviedb.org/4/auth/access_token"

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${import.meta.env.VITE_TMDBv4}`);

        const body = JSON.stringify({
            access_token
        })
        const request = await fetch(url, { method: "DELETE", body, headers })

        if (!request.ok) {
            throw Error('You are trying to log out when you are not logged in')
        }
        await request.json();
        window.sessionStorage.clear();
        setLogin(false)
    };

    return <header className={styles.Header}>
        <img src="https://picsum.photos/60" alt="" />
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {Login && <li><Link to="/login">Login</Link></li>}
                {!Login && <li><button className={styles.signout} onClick={handelLoginBtn}>Logga ut</button></li>}
                <li><Link to="/profile"><FontAwesomeIcon icon={faUser} size={"1x"} /></Link></li>
            </ul>
        </nav>
    </header>
}

export default Header;
