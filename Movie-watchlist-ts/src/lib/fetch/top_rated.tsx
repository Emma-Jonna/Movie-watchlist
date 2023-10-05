import axios from "axios";
import { Top_rated } from "../../interface/top rated";

type error = {
    message: string,
    satusCode: number
}

export default async function top_rated(CurentPage: number): Promise<(error | Top_rated)> {
    const urlFilms = `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_TMDBv3}`;
    try {
        const {
            data,
        }: { data: Top_rated } = await axios.get(urlFilms, {
            params: {
                api_key: import.meta.env.VITE_TMDBv3,
                page: CurentPage,
                language: "sv",
            },
        });
        return data
    } catch (error) {
        return {
            message: 'could not find top rated movie',
            satusCode: 500
        }
    }
}