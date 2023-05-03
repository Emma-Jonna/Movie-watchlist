import "./MovieInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function MovieInfo(props) {
    return (
        <article className="movie-wrapper">
            <div className="movie-card">
                <div className="movie-card-poster">
                    <img
                        src={
                            "https://image.tmdb.org/t/p/w342/" +
                            props.posterSource
                        }
                        alt=""
                    />
                </div>
                <div className="movie-card-text">
                    <h2>{props.title}</h2>
                    <div className="movie-card-original-info">
                        <div className="movie-card-original-lang">
                            <p>Original language:</p>
                            <p>{props.originalLanguage}</p>
                        </div>
                        <div className="movie-card-original-title">
                            <p>Original title:</p>
                            <p>{props.originalTitle}</p>
                        </div>
                    </div>
                    <div className="movie-card-text-info">
                        <div className="movie-card-release">
                            <p>Released:</p>
                            <p>{props.releaseDate}</p>
                        </div>
                        <div className="movie-card-runtime">
                            <p>Runtime:</p>
                            <p>{props.runtime} min</p>
                        </div>
                        <div className="movie-card-rating">
                            <p>{Math.round(props.averageScore * 10) / 10}/10</p>
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div className="movie-card-like-button">
                            <p>Add to watchlist:</p>
                            {props.likeButton}
                        </div>
                    </div>
                    <div className="movie-card-text-lists">
                        <div>{props.genres}</div>
                        <div>{props.production}</div>
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
