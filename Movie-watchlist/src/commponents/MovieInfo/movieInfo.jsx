function MovieInfo(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p className={props.genres}>genres</p>
      <p>{props.ageRating}</p>
      <p className={props.production}>production companies</p>
      <p>{props.originalLanguage}</p>
      <p>{props.originalTitle}</p>
      <p>{props.description}</p>
      <img
        src={"https://image.tmdb.org/t/p/w185/" + props.posterSource}
        alt=""
      />
      <p>{props.releaseDate}</p>
      <p>{Math.round((props.runtime / 60) * 10) / 10}</p>
      <p>{props.runtime}</p>
      <p>{Math.round(props.averageScore * 10) / 10}/10</p>
    </div>
  );
}

export default MovieInfo;
