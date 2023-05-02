import styles from "../css/style.module.css";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export default function SearchForm({
    setFilms,
    setFilm,
    setPageCount,
    CurentPage,
    setSearch,
    Search,
}) {
    const handelSubmit = (e) => {
        e.preventDefault();
        
        films();
    };
    const updateState = (e)=> {
        setSearch(e.target.value.trim());
    } 
    async function films() {
        const baseURL = "https://api.themoviedb.org/3";

        if (Search) {
            const {
                data: { results, total_pages },
            } = await axios.get(`${baseURL}/search/movie`, {
                params: {
                    api_key: import.meta.env.VITE_TMDBv3,
                    page: CurentPage,
                    query: Search,
                },
            });

            setFilms(results);
            setFilm(results[0]);

            setPageCount(total_pages);
        } else {
            /* Fetch the movies */
            const {
                data: { results, total_pages },
            } = await axios.get(`${baseURL}/movie/top_rated`, {
                params: { api_key: import.meta.env.VITE_TMDBv3 },
            });

            /* Set the state for the Films & Film form results */
            setFilms(results);
            setFilm(results[0]);
        }
    }

    useEffect(() => {
        films();
    }, [CurentPage]);

    return (
        <form onSubmit={handelSubmit} className={styles.search}>
            <div className="form-grop">
                <label htmlFor="sök">Sök på din favorit film</label>
                <input
                    type="search"
                    name="sök"
                    id="sök"
                    placeholder="Sök på din fvavorit film"
                    onChange={updateState}
                />
            </div>
            <button type="submit">
                <FontAwesomeIcon
                    icon={faSearch}
                    size="2x"
                    color="var(--viridian)"
                />
            </button>
        </form>
    );
}
