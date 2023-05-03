import { useEffect, useState } from "react";
import styles from "../css/style.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSessionStorage } from "usehooks-ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import { FilmCard } from "../commponents/filmCard";
import SearchForm from "../commponents/searchForm";
import ReactPaginate from "react-paginate";

function Home() {
    /* Film state */
    const [Films, setFilms] = useState([]);
    const [Film, setFilm] = useState({});

    /* Search form state */
    const [Search, setSearch] = useState("");

    /* paginate state */
    const [PageCount, setPageCount] = useState(0);
    const [CurentPage, setCurentPage] = useState(1);
    const [Session_id, setSession_id] = useSessionStorage("session_id");

    const navigate = useNavigate();

    const films = async () => {
        const urlFilms = "https://api.themoviedb.org/3/movie/top_rated";

        /* Fetch the movies */
        const {
            data: { results, total_pages, total_results },
        } = await axios.get(urlFilms, {
            params: {
                api_key: import.meta.env.VITE_TMDBv3,
                page: CurentPage,
                language: "sv",
            },
        });

        /* Modefing results  */
        const Star_Wars_A_New_Hope = {
            adult: false,
            backdrop_path: "/2w4xG178RpB4MDAIfTkqAuSJzec.jpg",
            genre_ids: [12, 28, 878],
            id: 11,
            original_language: "en",
            original_title: "Star Wars",
            overview:
                "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.",
            popularity: 84.174,
            poster_path: "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
            release_date: "1977-05-25",
            title: "Star Wars: A New Hope",
            video: false,
            vote_average: 8.208,
            vote_count: 18551,
        };

        results.splice(10, 0, Star_Wars_A_New_Hope);

        /* Set the state for the Films & Film form results */
        setFilms(results);
        setFilm(results[0]);

        setPageCount(total_pages);
    };
    const handlePageClick = ({ selected }) => {
        setCurentPage(selected + 1);
    };
    useEffect(() => {
        if (!sessionStorage.getItem("session_id")) {
            navigate("/login");
        }
        if (!Search) {
            films();
        }
    }, [CurentPage]);

    return !Film.backdrop_path ? null : (
        <>
            <section className={styles.Hero}>
                {Film.backdrop_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w1280/${Film.backdrop_path}`}
                        alt=""
                    />
                ) : (
                    <img src="./assets/No backdrop.png" alt="" />
                )}

                <div className={styles.container}>
                    <h1>{Film.title}</h1>
                    <p>{Film.overview}</p>
                </div>
            </section>

            <SearchForm
                setFilms={setFilms}
                setFilm={setFilm}
                setPageCount={setPageCount}
                CurentPage={CurentPage}
                Search={Search}
                setSearch={setSearch}
            />

            <section className={styles.HomeGrid}>
                {Films.map((item) => (
                    <FilmCard key={item.id} Film={item} />
                ))}
            </section>

            {PageCount > 1 && (
                <ReactPaginate
                    onPageChange={handlePageClick}
                    renderOnZeroPageCount={undefined}
                    pageCount={PageCount}
                    previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
                    nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
                    containerClassName={styles.PaginateContainer}
                    activeClassName={styles.selected}
                    activeLinkClassName={styles.active}
                    disabledClassName={styles.disabled}
                />
            )}
        </>
    );
}

export default Home;
