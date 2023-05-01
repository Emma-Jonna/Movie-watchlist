import "./MovieInfo.css";

function MovieInfo(props) {
    return (
        <article className="movie-wrapper">
            <div className="movie-card">
                <div className="movie-card-poster">
                    <img
                        src={
                            "https://image.tmdb.org/t/p/w185/" +
                            props.posterSource
                        }
                        alt=""
                    />
                </div>
                <div className="movie-card-text">
                    <h2>{props.title}</h2>
                    <div>{props.genres}</div>
                    <div>{props.production}</div>
                    <div>
                        <p>Original language: {props.originalLanguage}</p>
                        <p>Original title: {props.originalTitle}</p>
                    </div>
                    <div>
                        <p>Released: {props.releaseDate}</p>
                        <p>Runtime: {props.runtime} min</p>
                        <p>{Math.round(props.averageScore * 10) / 10}/10</p>
                    </div>
                    <div className="description">
                        <p>{props.description}</p>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default MovieInfo;
