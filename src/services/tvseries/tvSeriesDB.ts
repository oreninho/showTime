
//this type can be enhanced with more fields according to the API
import {connectionService} from "../connection/connectionService";
import {ICacheBehavior} from "../cacheService/types";
import {cacheService} from "../cacheService/cacheService";

export interface ITVSeriesDBData {
    score: number;
    show: {
        id: number;
        url: string;
        name: string;
        type: string;
        language: string;
        genres: string[];
        status: string;
        image: {
            medium: string;
            original: string;
        }
    }

}
export interface ITVSeriesDB {
    searchTVSeries(query: string): Promise<ITVSeriesDBData[]>;
}


class TVSeriesDB implements ITVSeriesDB {
    private readonly url: string = "http://api.tvmaze.com/search/shows?q="; //not secure, but it's ok for this exercise
    private cache:ICacheBehavior = cacheService;
    async searchTVSeries(query: string): Promise<ITVSeriesDBData[]> {
        const cachedData = await this.cache.get(query);
        if(cachedData){
            console.log('cached data');
            const moviesData = JSON.parse(cachedData);
            return moviesData;
        }
        else {
            const data = await connectionService.get<ITVSeriesDBData[]>(this.url + query);
            this.cache.set(query, JSON.stringify(data), 60*60*24);
            return data;
        }
    }
}
export const tvSeriesDB = new TVSeriesDB();