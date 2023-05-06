import axios from "axios";
import styles from "../css/style.module.css";

import { Result, Top_rated } from "../interface/top rated"
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type SearchType = {
    setFilms: React.Dispatch<React.SetStateAction<Result[] | undefined>>,
    setFilm: React.Dispatch<React.SetStateAction<Result | undefined>>,
    setPageCount: React.Dispatch<React.SetStateAction<number>>,
    CurrentPage: number,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
    Search: string
}

export default function searchForm({
    setFilms,
    setFilm,
    setPageCount,
    CurrentPage,
    setSearch,
    Search,
}: SearchType) {
    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        films();
    }

    const updateState = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value.trim())
    }

    async function films() {
        const baseURL = "https://api.themoviedb.org/3";

        if (Search) {
            const { data: { results, total_pages }
            }: { data: Top_rated } = await axios.get(`${baseURL}/search/movie`, {
                params: {
                    api_key: import.meta.env.VITE_TMDBv3,
                    page: CurrentPage,
                    query: Search
                }
            });

            /* Set the state for the Films & Film form results */
            setFilms(results);
            setFilm(results[0])

            setPageCount(total_pages)
        } else {
            /* Fetch the movies */
            const {
                data: {
                    results
                }
            }: { data: Top_rated } = await axios.get(`${baseURL}/movie/top_rated`, {
                params: { api_key: import.meta.env.VITE_TMDBv3, }
            });

            /* Set the state for the Films & Film form results */
            setFilms(results);
            setFilm(results[0])
        }
    }

    useEffect(() => {
        films()
    }, [CurrentPage])


    return (
        <form onSubmit={handelSubmit} className={styles.search}>
            <div className="form-grop">
                <label htmlFor="sök">Sök på din favorit Film</label>
                <input type="search" name="sök" id="sök" placeholder="Sök på din favorite film" onChange={updateState} />
            </div>

            <button type="submit">
                <FontAwesomeIcon icon={faSearch} size="2x" color="var(--viridian)" />
            </button>
        </form>
    )
}