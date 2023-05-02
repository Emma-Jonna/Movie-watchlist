import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import MovieInfo from "../commponents/MovieInfo";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LikeBtn } from "../commponents/LikeBtn";
import { FavoriteContext } from "../App";

function Movie() {
    const { id } = useParams();
    const [MovieCard, setMovie] = useState([]);
    const [Genres, setGenres] = useState([]);
    const [Production, setProduction] = useState([]);
    let [Like, setLike] = useState(false);
    let { Favorite, setFavorite } = useContext(FavoriteContext);

    const navigate = useNavigate();

    async function getLike() {
        const data = Favorite.filter((val) => {
            return val.title == MovieCard.title;
        });
        return data.length >= 1;
    }

    useEffect(() => {
        getLike()
            .then((res) => {
                setLike(res);
            })
            .catch((e) => console.error(e));
    }, [Favorite, MovieCard.poster_path]);

    useEffect(() => {
        if (!sessionStorage.getItem("session_id")) {
            navigate("/login");
        } else {
            getMovie();
        }
    }, []);

    const getMovie = async () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}}?api_key=${
                    import.meta.env.VITE_TMDBv3
                }`,
                requestOptions
            );

            const movieInfo = await response.json();

            setMovie(movieInfo);

            const genreNames = movieInfo.genres.map((genre) => genre.name);
            setGenres(genreNames);
            const productionCompanies = movieInfo.production_companies.map(
                (company) => company.name
            );
            setProduction(productionCompanies);

            return;
        } catch (e) {
            console.error(e);
        }
    };

    // console.log(MovieCard);

    return !MovieCard.poster_path ? null : (
        <section className="movie-info-wrapper">
            <div className="movie-card-button-container">
                <Link className="movie-card-button" to="/">{`< Back`}</Link>
            </div>
            <MovieInfo
                title={MovieCard.title}
                originalLanguage={MovieCard.original_language}
                originalTitle={MovieCard.original_title}
                description={MovieCard.overview}
                posterSource={MovieCard.poster_path}
                releaseDate={MovieCard.release_date}
                runtime={MovieCard.runtime}
                averageScore={MovieCard.vote_average}
                genres={
                    <ul>
                        <li>Genres:</li>
                        {Genres.map((genre, key) => {
                            return <li key={key}>{genre}</li>;
                        })}
                    </ul>
                }
                production={
                    <ul>
                        <li>Production companies:</li>
                        {Production.map((company, key) => {
                            return <li key={key}>{company}</li>;
                        })}
                    </ul>
                }
            />
            <LikeBtn Like={Like} setLike={setLike} Film={MovieCard} />
        </section>
    );
}

export default Movie;
