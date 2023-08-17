import React, {useEffect} from "react";
import {session} from "../session/session";
import {ITVSeriesDB, ITVSeriesDBData} from "../services/tvseries/tvSeriesDB";
import {ShowCard} from "./ShowCard";

export interface IFavoritesProps {
    className?: string;

}
export const Favorites: React.FC = () => {
    const [favorites, setFavorites] = React.useState<ITVSeriesDBData[]>([]);
    useEffect( () => {
        const fetchData = async () => {
            const favorites = await session.getFavorites();
            setFavorites(favorites);
        };
        fetchData();
    },favorites);
    return (
        <div className={"favorites"}>
            <h1>My Favorites</h1>
            {favorites.map((favorite) => {
                return (
             <ShowCard myShow={favorite} onAddToFavorites={()=>{console.log("asdasd")}} onRemoveFromFavorites={()=>{}}/>
                );
            })}
        </div>
    );

}