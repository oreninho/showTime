import React, {useEffect} from 'react';
import './App.scss';
import Search from "./components/Search";
import {ITVSeriesDBData, tvSeriesDB} from "./services/tvseries/tvSeriesDB";
import {session} from "./session/session";
import {ShowCard} from "./components/ShowCard";
import {Favorites} from "./components/Favorites";

function App() {

    //todo - 1.use cache when fetching movies, 2.add navigation, 3.add favorites, 4.add tests
    useEffect(() => {
        (async () => {
            console.log("Initializing session");
            await session.init(); // Asynchronously initialize the session
        })();
    }, []); // An empty dependency array ensures this runs once after the initial render

    const [tvSeries, setTvSeries] = React.useState<any[]>([]);
    const [search, setSearch] = React.useState<string>("");

// useEffect(() => {
//     (async () => {
//         const tvSeries = await tvSeriesDB.searchTVSeries(search);
//         setTvSeries(tvSeries);
//     })();
// });
    const handleSearch = async (search: string) => {
        const tvSeries = await tvSeriesDB.searchTVSeries(search);
        console.log(tvSeries);
        setTvSeries(tvSeries);
    }
    const addToFavorites = async (tvSeries:ITVSeriesDBData ) => {
        console.log(tvSeries.show.id)
        session.addToFavorites(tvSeries);
    }

    const removeFromFavorites = async (tvSeries:ITVSeriesDBData ) => {
         session.removeFromFavorites(tvSeries.show.id.toString());
    }

    return (
        <div className="App">

            <h2> The Tv Series Database </h2>
            <Search onSearch={(str)=>handleSearch(str)}/>
            <div className={"showWrapper"}>
                <div className="tvSeries">
                    {tvSeries.map((tvSeries: ITVSeriesDBData) => (
                        <ShowCard key={tvSeries.show.id} myShow={tvSeries} onAddToFavorites={()=>addToFavorites(tvSeries)} onRemoveFromFavorites={()=>removeFromFavorites(tvSeries)}/>
                    ))}
                </div>
                <Favorites/>
            </div>
        </div>
    );
}

export default App;
