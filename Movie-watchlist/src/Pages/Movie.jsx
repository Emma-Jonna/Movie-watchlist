import {useParams} from "react-router-dom";
import React, {useState, useEffect} from "react";
import MovieInfo from "../commponents/MovieInfo";

function Movie() {
  const {id} = useParams();

  const [MovieCard, setMovie] = useState([]);
  const [Genres, setGenres] = useState([]);

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
      setGenres(movieInfo.genres);

      return;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getMovie();

    /* MovieCard.map((element, index) => {
      console.log(element);
    }); */
  }, []);

  // console.log(MovieCard.genres);
  // console.log(Genres);

  // console.log(Movie.genres[0]);

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
      genres={MovieCard.genres[0].name}
    />
  );
}

export default Movie;
