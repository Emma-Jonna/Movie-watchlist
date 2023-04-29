import { useEffect, useState } from "react";
import styles from "../css/style.module.css";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import { FilmCard } from "../commponents/filmCard";
import SearchForm from "../commponents/searchForm";
import ReactPaginate from "react-paginate";

function Home() {
  const [Films, setFilms] = useState([]);
  const [Film, setFilm] = useState({});

  /* paginate state */
  const [PageCount, setPageCount] = useState(0);
  const [CurentPage, setCurentPage] = useState(1);

  const films = async () => {
    const urlFilms = "https://api.themoviedb.org/3/movie/top_rated";

    /* Fetch the movies */
    const {
      data: { results, total_pages, total_results },
    } = await axios.get(urlFilms, {
      params: { api_key: import.meta.env.VITE_TMDBv3, page: CurentPage },
    });

    /* Set the state for the Films & Film form results */
    setFilms(results);
    setFilm(results[0]);

    setPageCount(total_pages);
  };
  const handlePageClick = ({selected}) => {
    setCurentPage(selected)
  };
  useEffect(() => {
    films();
  }, [CurentPage]);

  return (
    <>
      <section className={styles.Hero}>
        <img
          src={`https://image.tmdb.org/t/p/w1280/${Film.backdrop_path}`}
          alt=""
        />

        <div className={styles.container}>
          <h1>{Film.title}</h1>
          <p>{Film.overview}</p>
        </div>
      </section>

      <SearchForm setFilms={setFilms} setFilm={setFilm} />

      <section className={styles.HomeGrid}>
        {Films.map((item) => (
          <FilmCard key={item.id} Film={item} />
        ))}
      </section>

      <ReactPaginate
        onPageChange={handlePageClick}
        renderOnZeroPageCount={null}
        pageCount={PageCount}
        pageRangeDisplayed={2}
        previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
        nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
        className={styles.PaginateContainer}
        activeClassName={styles.selected}
        activeLinkClassName={styles.active}
        disabledLinkClassName={styles.disabled}
      />
    </>
  );
}

export default Home;
