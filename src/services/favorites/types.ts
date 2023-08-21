import {ITVSeriesDBData} from "../tvseries/tvSeriesDB";

export interface IFavoritesBehavior{
    getFavorites(): Promise<ITVSeriesDBData[]>;
    addFavorite(data:ITVSeriesDBData): void;
    removeFavorite(id: string): Promise<boolean>;
    isFavorite(id: string): Promise<boolean>;

}

export const FAVORITES_TABLE_NAME = 'favorites';