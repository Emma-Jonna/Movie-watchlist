import { useEffect, useState } from "react";
import styles from "../css/style.module.css";

import { FilmCard } from "../commponents/filmCard";

function Home () {
    const [Films, setFilms] = useState([])

    const films = async () => {
        const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=377726bdb2fe4f22ae2b437d8ee6f0dd`;
        
        const res = await fetch(url);
        const respond = await res.json();
        
        setFilms(respond.results);
    }
    
    useEffect(() => {   
        films()
    }, [Films])
    
    return (
        <div className={styles.HomeGrid}>
            {Films.map( item => <FilmCard key={item.id} poster_path={item.poster_path} title={item.title} id={item.id} vote_average={item.vote_average} />)}
        </div>
    )
}

export default Home