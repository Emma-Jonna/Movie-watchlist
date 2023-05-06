import { useEffect, useState } from "react";
import { Top_rated, Result } from "../interface/top rated";
import styles from "../css/style.module.css";
import axios from "axios";
import ReactPaginate from "react-paginate";
import SearchForm from "../commponents/searchForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import FilmCard from "../commponents/filmCard";

export default function Home() {
    /* Film state */
    const [Films, setFilms] = useState<Result[] | undefined>();
    const [Film, setFilm] = useState<Result>();

    /* Search form state */
    const [Search, setSearch] = useState("");

    /* paginate state */
    const [PageCount, setPageCount] = useState(0);
    const [CurentPage, setCurentPage] = useState(1);

    const films = async () => {
        const urlFilms = `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDBv3}`;

        /* Fetch the movies */
        const {
            data: { results, total_pages },
        }: { data: Top_rated } = await axios.get(urlFilms, {
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

        setFilms(results);
        setFilm(results[0]);

        setPageCount(total_pages);

    }

    const handlePageClick = ({ selected }: { selected: number }) => {
        setCurentPage(selected + 1);
    };

    useEffect(() => {
        films()
    }, [CurentPage])

    if (!Film) {
        return <h1>Not working</h1>
    }
    if (!Films) {
        return <h1>Not working</h1>
    }

    return (
        <>
            <section className={styles.Hero}>
                {Film.backdrop_path ?
                    <img
                        src={`https://image.tmdb.org/t/p/w1280/${Film.backdrop_path}`}
                        alt=""
                    />
                    :
                    <img src="./assets/No backdrop.png" alt="" />
                }

                <div className={styles.container}>
                    <h1>{Film.title}</h1>
                    <p>{Film.overview}</p>
                </div>
            </section>

            <SearchForm
                setFilms={setFilms}
                setFilm={setFilm}
                setPageCount={setPageCount}
                CurrentPage={CurentPage}
                Search={Search}
                setSearch={setSearch}
            />

            <section className={styles.HomeGrid}>
                {Films.map(item => 
                    <FilmCard Film={item} key={item.id} />
                )}
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
    )
}