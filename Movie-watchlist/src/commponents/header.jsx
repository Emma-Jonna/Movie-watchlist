import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

import styles from "../css/style.module.css";
function Header () {
    return <header className={styles.Header}>
        <img src="https://picsum.photos/60" alt="" />
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/Profil"><FontAwesomeIcon icon={faUser} size={"1x"} /></a></li>
            </ul>
        </nav>
    </header>
}

export default Header