import React from "react";
import {ITVSeriesDBData} from "../services/tvseries/tvSeriesDB";


export interface IMovieItem{
    image: string;
    title: string;
    score: number;
    genres: string[];
}

export interface IMovieCardProps {
    myShow: ITVSeriesDBData;
    onAddToFavorites: () => void;
    onRemoveFromFavorites: () => void;
}

export interface IMovieCardState {
    isFavorite: boolean;
}

export const ShowCard: React.FC<IMovieCardProps> = (props:IMovieCardProps  ) => {

    const [isFavorite, setIsFavorite] = React.useState(false);
    const {myShow} = props;
    const {show,score} = myShow;


    const toggleFavorite = async () => {
      setIsFavorite(!isFavorite)
    }

    return (
        <div className="card" key={show.id} id={show.id.toString()}>
            {
            show.image &&
                    <img src={show.image.medium} />
            }
            <div className={"card-details"}>
                <div className="name">
                    {show.name}
                </div>
                <div className="score">
                    { Math.round(score * 100) / 10  }
                </div>
                {
                    show.genres &&
                    <div className="genre">
                        {show.genres.join(" | ")}
                    </div>
                }
            </div>
            <i
                className={`fa fa-heart heart-icon ${isFavorite ? 'active' : ''}`}
                onClick={() => toggleFavorite()}
            ></i>
        </div>
    )
}

