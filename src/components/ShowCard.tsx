import React, {} from "react";
import {ITVSeriesDBData} from "../services/tvseries/tvSeriesDB";


export interface IMovieCardProps {
    isFavorite: boolean;
    myShow: ITVSeriesDBData;
    onAddToFavorites: () => Promise<void>;
    onRemoveFromFavorites: () => Promise<void>;
}

export const ShowCard: React.FC<IMovieCardProps> = (props: IMovieCardProps) => {
    const [isFavorite, setIsFavorite] = React.useState(props.isFavorite);
    const {myShow} = props;
    const {show, score} = myShow;

    const toggleFavorite = async () => {
        if (isFavorite) {
            await props.onRemoveFromFavorites();
        } else {
            await props.onAddToFavorites();
        }
        setIsFavorite(!isFavorite)
    }

    return (
        <div className="card" key={show.id} id={show.id.toString()}>
            {
                <img src={show.image&& show.image.medium} alt={show.image&&show.image.original}/>
            }
            <div className={"card-details"}>
                <div className="name">
                    {show.name}
                </div>
                <div className="score">
                    {Math.round(score * 100) / 10}
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

