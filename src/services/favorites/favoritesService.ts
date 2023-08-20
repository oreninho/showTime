import {ITVSeriesDBData} from "../tvseries/tvSeriesDB";
import {FAVORITES_TABLE_NAME, IFavoritesBehavior} from "./favoriteUsingDb";


class FavoritesService implements IFavoritesBehavior {
    private db = localStorage;
    private static FAVORITES_KEY = FAVORITES_TABLE_NAME;
    constructor() {
        if (!localStorage.getItem(FavoritesService.FAVORITES_KEY)) {
            localStorage.setItem(FavoritesService.FAVORITES_KEY, JSON.stringify([]));
        }
    }

    getFavorites(): Promise<ITVSeriesDBData[]> {
        return JSON.parse(this.db.getItem(FavoritesService.FAVORITES_KEY));
    }

    addFavorite(data:ITVSeriesDBData): Promise<boolean> {
        let currentFavorites = JSON.parse(this.db.getItem(FavoritesService.FAVORITES_KEY));
        if (!currentFavorites.some((item:ITVSeriesDBData)=>
            item.show && item.show.id.toString() === data.show.id.toString())) {
            currentFavorites.push(data);
            this.db.setItem(FavoritesService.FAVORITES_KEY, JSON.stringify(currentFavorites));
        }

        return Promise.resolve(true);
    }

    async removeFavorite(favoriteId: string): Promise<boolean> {

        let currentFavorites = await this.getFavorites();
        if (currentFavorites) {
            currentFavorites = currentFavorites.filter((item)=> item.show && item.show.id.toString() !== favoriteId);
            console.log('removeFavorite',currentFavorites);
            this.db.setItem(FAVORITES_TABLE_NAME, JSON.stringify(currentFavorites));
            console.log('removeFavorite',favoriteId);
            return true
        }
        return false;
    }

    async isFavorite(tvSeriesId: string): Promise<boolean> {
        const currentFavorites = JSON.parse(this.db.getItem(FAVORITES_TABLE_NAME));
        if (currentFavorites) {
            return currentFavorites.some((item:ITVSeriesDBData)=>item.show.id.toString() === tvSeriesId);
        }
        return false;
    }
}
const favoritesService = new FavoritesService();
export default favoritesService;