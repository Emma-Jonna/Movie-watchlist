import {useParams} from "react-router-dom";
import React, {useState, useEffect} from "react";
import MovieInfo from "../commponents/MovieInfo";

function Movie() {
  const {id} = useParams();

  const [MovieCard, setMovie] = useState([]);
  const [Genres, setGenres] = useState([]);
  const [Production, setProduction] = useState([]);

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

  useEffect(() => {
    getMovie();
  }, []);

  console.log(MovieCard);

  return !MovieCard.poster_path ? null : (
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
  );
}

export default Movie;
