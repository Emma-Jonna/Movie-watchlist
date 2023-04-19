import { useEffect, useState } from "react";
import styles from "../css/style.module.css";

import { FilmCard } from "../commponents/filmCard";

function Home () {
    const [Films, setFilms] = useState([])

    const films = async () => {
        const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDBv3}`;
        
        const res = await fetch(url);
        const respond = await res.json();
        
        setFilms(respond.results);
    }
    
    useEffect(() => {   
        films()
    }, [])
    
    return (
        <div className={styles.HomeGrid}>
            {Films.map( item => <FilmCard key={item.id} poster_path={item.poster_path} title={item.title} id={item.id} vote_average={item.vote_average} />)}
        </div>
    )
}

export default Home