import {useState} from "react";
import MovieDetailData from "../data/MovieDetailData.json";
const MovieDetail = () => {
    const [data, setData] = useState(MovieDetailData);

    const baseUrl = "https://image.tmdb.org/t/p/w500";
    return (
        <div className="movie-detail">
            <div className="img">
                <img
                    src={baseUrl + data.belongs_to_collection.poster_path}
                    alt={data.belongs_to_collection.name}
                />
            </div>
            <div className="info">
                <p>
                    제목 : {data.title} 평점 : {data.vote_average}
                </p>
                <p>
                    장르 :
                    {data.genres.map((el, index) => (
                        <span key={index}>{el.name}</span>
                    ))}
                </p>
                <p>{data.overview}</p>
            </div>
        </div>
    );
};

export default MovieDetail;
