//this is the brain of the application

import {connectionService} from "../services/connection/connectionService";
import {ConnectionBehaviorAxios} from "../services/connection/connectionAxios";
import {cacheService} from "../services/cacheService/cacheService";
import {LocalStorageCache} from "../services/cacheService/localStorageCache";
import {ITVSeriesDBData} from "../services/tvseries/tvSeriesDB";

export class Session{

    //should make sure that it is called only once

    public async init(){
        // await dbService.init();
         connectionService.init(new ConnectionBehaviorAxios());
         cacheService.init(new LocalStorageCache());
         console.log('Session initialized')
        // await userService.init();
    }

    //userId to allow more than one user
    public addToFavorites(data:ITVSeriesDBData){

        cacheService.set("_favorites"+data.show.id, JSON.stringify(data), 60*60*24);
    }
    public removeFromFavorites(tvSeriesId:string){
        cacheService.del("_favorites"+tvSeriesId);
        // await userService.removeFromFavorites(userId,tvSeriesId);
    }
    public async getFavorites(){
        const favorites = await cacheService.get("_favorites*");
        if (favorites){
            const favoritesData = JSON.parse(favorites);
            return favoritesData;
        }
        return [];
        // return await userService.getFavorites(userId);
    }
}
export const session = new Session();