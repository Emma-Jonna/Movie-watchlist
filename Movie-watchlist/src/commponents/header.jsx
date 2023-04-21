import {Link} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

import styles from "../css/style.module.css";
import {useEffect, useState} from "react";

function Header() {
  const [Login, setLogin] = useState(false);

    let session_id = window.sessionStorage.getItem('session_id');
    const access_token = window.sessionStorage.getItem('accessToken');
    
    
    useEffect(() => {
        console.log(!session_id);
        setLogin(false)
        if (!session_id) {
            setLogin(true)
        }
    }, [session_id])

    function handelLogUt() {
        const headers = new Headers();
        headers.append("Content-Type", "application/json;charset=utf-8");
        headers.append("Authorization", `Bearer ${import.meta.env.VITE_TMDBv4}`);

        const body = JSON.stringify({ access_token })

        /* Fetch */
        fetch('https://api.themoviedb.org/4/auth/access_token', { headers, body, method: "DELETE" })
            .then(res => res.json())
            .then(() => {
            })
            .catch(e => console.error(e));
            window.sessionStorage.clear();
            session_id = null;
    }

  return (
    <header className={styles.Header}>
      <img src="https://picsum.photos/60" alt="" />
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
              <button className={styles.signout} onClick={handelLogUt}>
                Logga ut
              </button>
            </li>
          )}
          <li>
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} size={"1x"} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
