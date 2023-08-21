import React, {useEffect} from 'react';
import './App.scss';
import Search from "./components/Search";
import {ITVSeriesDBData, tvSeriesDB} from "./services/tvseries/tvSeriesDB";
import {session} from "./session/session";
import {ShowCard} from "./components/ShowCard";

function App() {
    const [isSessionInitialized, setSessionInitialized] = React.useState<boolean>(false);
    const [tvSeries, setTvSeries] = React.useState<any[]>([]);
    const [favorites, setFavorites] = React.useState<ITVSeriesDBData[]>([]);
    useEffect(() => {
        (async () => {
            console.log("Initializing session");
            if (!session.isInitialized())
            {
                await session.init();
                console.log("Session initialized");
                setSessionInitialized(true);
            }
        })();
    }, []); // An empty dependency array ensures this runs once after the initial render


    useEffect(() => {
        const fetchFavorites = async () => {
            if (!isSessionInitialized  )
                return;
            try {
                return await session.getFavorites();
            } catch (e) {
                console.log(e);
            }
        }
        fetchFavorites().then((favoredShows) => {
            if (!favoredShows)
                return;
            setFavorites(favoredShows);

        });
        return () => {
            console.log("Cleaning up");

        }
    }, [isSessionInitialized]);


    const handleSearch = async (search: string) => {
        const tvSeries = await tvSeriesDB.searchTVSeries(search);
        console.log(tvSeries);
        setTvSeries(tvSeries);
    }
    const addToFavorites = async (tvSeries:ITVSeriesDBData ) => {
        tvSeries.show.isFavorite = true;
        setFavorites([...favorites,tvSeries]);
        await session.addToFavorites(tvSeries);
    }

    const removeFromFavorites = async (tvSeries:ITVSeriesDBData ) => {
        tvSeries.show.isFavorite = false;
        const newFavorites = favorites.filter((favorite:ITVSeriesDBData) => favorite.show.id !== tvSeries.show.id);
        setFavorites(newFavorites);
        await session.removeFromFavorites(tvSeries.show.id.toString());
    }



    return (
        <div className="App">

            <h1> The Tv Series Database </h1>
            <Search onSearch={(str)=>handleSearch(str)}/>
            <div className={"showWrapper"}>
                <div className="tvSeries">
                    <h2>Search Results</h2>
                    {tvSeries.length>0 && tvSeries.map((tvSeries: ITVSeriesDBData) => (
                        <ShowCard key={tvSeries.show.id} myShow={tvSeries} isFavorite={tvSeries.show.isFavorite||false}
                                  onAddToFavorites={()=>addToFavorites(tvSeries)} onRemoveFromFavorites={()=>removeFromFavorites(tvSeries)}/>
                    ))}
                    {tvSeries.length===0 && <div>No results</div>}
                </div>
                <div className={"favoritesWrapper"} >
                    <h2>My Favorites</h2>
                    <div className="favorites">
                        {favorites&& favorites.length>0 && favorites.map((tvSeries: ITVSeriesDBData) => (
                            <ShowCard key={tvSeries.show?tvSeries.show.id:"123"} myShow={tvSeries} isFavorite={true}
                                      onAddToFavorites={()=>addToFavorites(tvSeries)} onRemoveFromFavorites={()=>removeFromFavorites(tvSeries)}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
