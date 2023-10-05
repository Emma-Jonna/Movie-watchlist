import { Movie } from "../interface/movie";

export default function movieInfo( Film : Movie) {
    return (
        <article className="movie-wrapper">
            <div className="movie-card">
                <div className="movie-card-poster">
                    <img src={`https://image.tmdb.org/t/p/w342/${Film.poster_path}`} alt="" />
                </div>
            </div>
        </article>
    )
}