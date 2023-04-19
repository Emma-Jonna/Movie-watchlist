import {Link} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

import styles from "../css/style.module.css";

function Header () {
    return <header className={styles.Header}>
        <img src="https://picsum.photos/60" alt="" />
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/profile"><FontAwesomeIcon icon={faUser} size={"1x"} /></Link></li>
            </ul>
        </nav>
    </header>
}

export default Header;
