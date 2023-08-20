import {db, Idb} from "../db/db";
import {ITVSeriesDBData} from "../tvseries/tvSeriesDB";


export interface IFavoritesBehavior {
    getFavorites(): Promise<ITVSeriesDBData[]>;
    addFavorite(data:ITVSeriesDBData): Promise<boolean>;
    removeFavorite(favoriteId: string): Promise<boolean>;
    isFavorite(tvSeriesId: string): Promise<boolean>;
}
export interface IFavoritesTable {
    id: number;
    score: number;
    genres: string;
    name: string;
    image: string;
}

export const FavoritesSchema: IFavoritesTable = {
    id: 0,
    score: 0,
    genres: "",
    name: "",
    image: ""

}

export const FAVORITES_TABLE_NAME = "favorites";
export default class Favorites implements IFavoritesBehavior{
    private _db?:Idb;
    private _tableName = FAVORITES_TABLE_NAME;

    async init(): Promise<void> {
        this._db = db;
        // if (await this._db.tableExists(this._tableName)){
        //     return;
        // }
        // const keys = Object.keys(FavoritesSchema).join(',');
        // await this._db.createTable(this._tableName,keys);
    }
    async getFavorites(): Promise<ITVSeriesDBData[]> {
        const rawData = await this._db!.select<IFavoritesTable>(this._tableName);
        return rawData.map((item:IFavoritesTable)=>{
            const genres = item.genres.split(',');
            const image = item.image;
            return {
                score: item.score,
                show: {
                    id: item.id,
                    name: item.name,
                    genres,
                    image: {
                        medium: image,
                        original: image
                    }
                }
            }
        });
    }
    async removeFavorite(favoriteId: string): Promise<boolean> {
        const result = await this._db!.delete(this._tableName,parseInt(favoriteId));
        return result > 0;
    }
    async addFavorite(data:ITVSeriesDBData): Promise<boolean> {

        const result = await this._db!.insert(this._tableName,this.dataToInsert(data));
        return result > 0;
    }

    private dataToInsert(data:ITVSeriesDBData):IFavoritesTable{
        const {show} = data;
        const genres = show.genres.join(',');
        const image = show.image ? show.image.medium : '';
        return {
            id: show.id,
            score: data.score,
            genres,
            name: show.name,
            image
        };
    }
    async isFavorite(tvSeriesId: string): Promise<boolean> {
        const favorites = await this.getFavorites();
        return favorites.some((item:ITVSeriesDBData)=>{
            return item.show.id === parseInt(tvSeriesId);
        });
    }
}
const favoritesDBService = new Favorites();
export {favoritesDBService};