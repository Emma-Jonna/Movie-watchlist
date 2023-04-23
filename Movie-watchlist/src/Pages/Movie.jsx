import {useParams} from "react-router-dom";
import React, {useState, useEffect} from "react";
import MovieInfo from "../commponents/MovieInfo";

function Movie() {
  const {id} = useParams();
  // console.log(id);

  const [Movie, setMovie] = useState([]);

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
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  console.log(Movie);

  return !Movie.poster_path ? null : (
    <div>
      <MovieInfo
        title={Movie.title}
        ageRating={Movie.adult}
        originalLanguage={Movie.original_language}
        originalTitle={Movie.original_title}
        description={Movie.overview}
        posterSource={Movie.poster_path}
        releaseDate={Movie.release_date}
        runtime={Movie.runtime}
        averageScore={Movie.vote_average}
      />
    </div>
  );
}

export default Movie;
