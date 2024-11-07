import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {detailMovie} from "../api/api";
const MovieDetail = () => {
    const {id} = useParams(); // URL에서 id 파라미터를 가져옴
    const [detailData, setDetailData] = useState(null);
    const baseUrl = "https://image.tmdb.org/t/p/w500";
    useEffect(() => {
        detailMovie(id)
            .then(data => {
                setDetailData(data);
                console.log(data);
            })
            .catch(error => {
                console.log("API 호출 중 오류 발생:", error);
            });
        console.log(detailData);
    }, [id]);

    if (!detailData) {
        return <div>Loading...</div>;
    }
    return (
        <div className="movie-detail">
            <div className="img">
                <img
                    src={baseUrl + detailData.belongs_to_collection.poster_path}
                    alt={detailData.belongs_to_collection.name}
                />
            </div>
            <div className="info">
                <p>
                    제목 : {detailData.title} 평점 : {detailData.vote_average}
                </p>
                <p>
                    장르 :
                    {detailData.genres.map((el, index) => (
                        <span key={index}>{el.name}</span>
                    ))}
                </p>
                <p>{detailData.overview}</p>
            </div>
        </div>
    );
};

export default MovieDetail;
