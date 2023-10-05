import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Result } from "../interface/top rated";
import { useSessionStorage } from "usehooks-ts";
import { Genre, ProductionCompany, Movie } from "../interface/movie";
import { FavoriteContext } from "../Context/Favorite";
import axios from "axios";
import BackButton from "../commponents/backButton";

export default function () {
    const { id } = useParams();
    const [MovieCard, setMovie] = useState<Movie | null>()
    const [Genres, setGenres] = useState<Genre[]>();
    const [Production, setProduction] = useState<ProductionCompany[]>();
    const [Like, setLike] = useState(false);
    const { Favorite, setFavorite } = useContext(FavoriteContext);
    const [session_id, setSession_id] = useSessionStorage('session_id', "");

    const navigate = useNavigate();

    async function getLike(Favorite: Result[]): Promise<boolean> {
        const data = Favorite.filter(val => {
            return val.title == MovieCard?.title
        })

        return data.length >= 1
    }

    useEffect(() => {
        if (Favorite) {
            getLike(Favorite)
                .then(res => {
                    setLike(res);
                })
                .catch(e => {
                    console.error(e);
                })
        }
    }, [Favorite])


    useEffect(() => {
        /* change to "!session_id" */
        if (session_id) {
            console.log("no session");
            navigate("/")
        } else {
            getMovie();
        }
    }, [])

    const getMovie = async () => {
        const { data }: { data: Movie } = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: {
                api_key: import.meta.env.VITE_TMDBv3
            }
        })

        setMovie(data);
    }

    if (!MovieCard) {
        return;
    }

    return !MovieCard.poster_path ? null : (
        <section>
            <BackButton text={`< Home`} location={`/`} />
            <MovieCard Film={MovieCard} />
        </section>
    )
}
