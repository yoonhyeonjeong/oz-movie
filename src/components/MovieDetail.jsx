import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {detailMovie} from "../api/api";
import styled from "styled-components";
const MovieDetailContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: ${({backgroundImage}) => `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: cetner center;
    .movie-detail {
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(8px);
        background-color: rgba(0, 0, 0, 0.6);
        color: #fff;
        max-width: 1000px;
        border-radius: 10px;
        overflow: hidden;
    }
    .movie-detail img {
        max-width: initial;
        width: 400px;
    }
    .movie-detail .info {
        text-align: left;
        margin-left: 20px;
    }
    .movie-detail .info p span {
        margin: 0 3px;
    }
`;
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
    }, [id]);

    if (!detailData) {
        return <div>Loading...</div>;
    }
    return (
        <MovieDetailContainer backgroundImage={baseUrl + detailData.backdrop_path}>
            <div className="movie-detail">
                <div className="img">
                    <img
                        src={baseUrl + detailData.poster_path}
                        alt={detailData.title}
                    />
                </div>
                <div className="info">
                    <p className="text-3xl">{detailData.title}</p>
                    <p>평점 : {detailData.vote_average}</p>
                    <p>
                        장르 :
                        {detailData.genres.map((el, index) => (
                            <span key={index}>{el.name}</span>
                        ))}
                    </p>
                    <p>{detailData.overview}</p>
                </div>
            </div>
        </MovieDetailContainer>
    );
};

export default MovieDetail;
