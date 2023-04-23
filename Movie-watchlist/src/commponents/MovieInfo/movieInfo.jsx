import "./MovieInfo.css";

function MovieInfo(props) {
  return (
    <article>
      <div className="movie-card">
        <div className="movie-card-poster">
          <img
            src={"https://image.tmdb.org/t/p/w185/" + props.posterSource}
            alt=""
          />
        </div>
        <div className="movie-card-text">
          <h2>{props.title}</h2>
          <p>Genres: {[props.genres]}</p>
          <p className={props.production}>production companies</p>
          <p>Original language: {props.originalLanguage}</p>
          <p>Original title: {props.originalTitle}</p>
          <p>Released: {props.releaseDate}</p>
          <p>Runtime: {props.runtime} min</p>
          <p>{Math.round(props.averageScore * 10) / 10}/10</p>
          <p>{props.description}</p>
        </div>
      </div>
    </article>
  );
}

export default MovieInfo;
