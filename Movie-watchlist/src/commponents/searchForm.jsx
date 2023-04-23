import styles from "../css/style.module.css";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default  function SearchForm({setFilms, setFilm}) {
    const handelSubmit = async (e) => {
        e.preventDefault();

        const input = e.target[0];

        if (input.value.trim().length > 0) {
            const {data: {results}} = await axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: import.meta.env.VITE_TMDBv3,
                    query: input.value.trim()
                }
            })

            setFilms(results);
            setFilm(results[0])
        }

        console.log(results);
    }


    return (
        <form onSubmit={handelSubmit} className={styles.search}>
        <div className="form-grop">
            <label htmlFor="sök">Sök på din favorit film</label>
            <input
            type="search"
            name="sök"
            id="sök"
            placeholder="Sök på din fvavorit film"
            />
        </div>
        <button type="submit">
            <FontAwesomeIcon icon={faSearch} size="2x" color="var(--viridian)" />
        </button>
        </form>
    );
}
