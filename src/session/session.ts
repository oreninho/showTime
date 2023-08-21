
import {connectionService} from "../services/connection/connectionService";
import {ConnectionBehaviorAxios} from "../services/connection/connectionAxios";
import {cacheService} from "../services/cacheService/cacheService";
import {LocalStorageCache} from "../services/cacheService/localStorageCache";
import {ITVSeriesDBData} from "../services/tvseries/tvSeriesDB";

import favoritesService from "../services/favorites/favoritesService";


export class Session{

    private static isInitialized = false;
    private favoritesService = favoritesService;
    public async init(){
        if (Session.isInitialized){
            return;
        }

        connectionService.init(new ConnectionBehaviorAxios());
        cacheService.init(new LocalStorageCache());
        console.log('Session initialized');
        Session.isInitialized = true;
    }

    public isInitialized():boolean{
        return Session.isInitialized;
    }
    //userId to allow more than one user
    public async addToFavorites(data:ITVSeriesDBData){
        console.log('addToFavorites',data.show.id);
        await this.favoritesService.addFavorite(data);
    }
    public async removeFromFavorites(tvSeriesId:string){
        await this.favoritesService.removeFavorite(tvSeriesId);
    }
    public async getFavorites(): Promise<ITVSeriesDBData[]>{
        return await this.favoritesService.getFavorites();
    }
}
export const session = new Session();