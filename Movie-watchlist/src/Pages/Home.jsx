import {useEffect, useState} from "react";
import styles from "../css/style.module.css";

import axios from "axios";

import { FilmCard } from "../commponents/filmCard";
import SearchForm from "../commponents/searchForm";

function Home() {
  let [Films, setFilms] = useState([]);
  const [Film, setFilm] = useState({});

  const films = async () => {
    const urlFilms = "https://api.themoviedb.org/3/movie/top_rated";

    /* Fetch the movies */
    const {data: { results }} = await axios.get(urlFilms, { params: { api_key: import.meta.env.VITE_TMDBv3 } });

    /* Set the state for the Films & Film form results */
    setFilms(results);
    setFilm(results[0])
  };
  
  useEffect(() => {
    films();
  }, []);
  

  return (
    <>
    <section className={styles.Hero}>
      <img src={`https://image.tmdb.org/t/p/w1280/${Film.backdrop_path}`} alt="" />

      <div className={styles.container}>
        <h1>{Film.title}</h1>
        <p>{Film.overview}</p>
      </div>
    </section>

    <SearchForm setFilms={setFilms} setFilm={setFilm} />

    <section className={styles.HomeGrid}>
      {Films.map((item) => (
        <FilmCard
          key={item.id}
          Film={item}
        />
      ))}
    </section>
    </>
  );
}

export default Home;
