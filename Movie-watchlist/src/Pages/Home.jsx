import { useEffect, useState } from "react";
import styles from "../css/style.module.css";

import { FilmCard } from "../commponents/filmCard";

function Home () {
    let [ Films, setFilms ] = useState([])
    const [ Favorites, setFavorites ] = useState([])
    
    const films = async () => {
        const session_id = window.sessionStorage.getItem("session_id");
        
        const urlFavorite = `https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?api_key=${import.meta.env.VITE_TMDBv3}&session_id=${session_id}`;
        const urlFilms = `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDBv3}`;
        
        const resFavorite = await fetch(urlFavorite);
        const resFilms = await fetch(urlFilms);
        
        const respondFilms = await resFilms.json();
        const respondFavorite = await resFavorite.json();
        
        if (!resFilms.ok) {
            throw Error('Can´t get film')
        }
        
        if (!resFavorite.ok) {
            throw Error('Can´t get favorite')
        }

        const results = Object.entries(respondFilms.results).map(data => {
            respondFavorite.results.map(fav => {
                console.log(data[1].original_title == fav.original_title);
                if (data[1].original_title == fav.original_title) {
                    data[1].like = true;
                } else {
                    data[1].like = false;
                }
            })

            return data[1];
        });
        
        setFilms(results);
    }

    const filter = () => {
        films()
        
        

    }
    useEffect(() => {   
        filter()
    }, [])
    return (
        <div className={styles.HomeGrid}>
            {Films.map( item => <FilmCard key={item.id} poster_path={item.poster_path} title={item.title} id={item.id} vote_average={item.vote_average} like={item.like} />)}
        </div>
    )
}

export default Home;
