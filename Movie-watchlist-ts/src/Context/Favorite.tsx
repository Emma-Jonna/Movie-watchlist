import { createContext, useState } from "react";
import { Result } from "../interface/top rated";

type FavoriteContextProviderProps = {
    children: React.ReactNode
}

type FavoriteContextType = {
    Favorite: Result[] | null,
    setFavorite: React.Dispatch<React.SetStateAction<Result[] | null>>
}
export const FavoriteContext = createContext({} as FavoriteContextType);

export const FavoriteContextProvider = ({ children }: FavoriteContextProviderProps) => {
    let [Favorite, setFavorite] = useState<Result[] | null>(null);
    return <FavoriteContext.Provider value={{ Favorite, setFavorite }}>{children}</FavoriteContext.Provider>
}