import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {detailMovie} from "../api/api";
import styled from "styled-components";
const MovieDetailContainer = styled.div`
    background-image: ${({backgroundImage}) => `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`};
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
        <MovieDetailContainer
            backgroundImage={baseUrl + detailData.backdrop_path}
            className="flex items-center justify-center h-[100vh] bg-cover bg-center"
        >
            <div className="movie-detail flex items-center justify-center backdrop-blur-lg bg-black bg-opacity-60 text-white max-w-4xl overflow-hidden">
                <div className="img">
                    <img
                        src={baseUrl + detailData.poster_path}
                        alt={detailData.title}
                        className="w-[400px] max-w-none"
                    />
                </div>
                <div className="text-left ml-[20px]">
                    <p className="text-3xl">{detailData.title}</p>
                    <p className="mt-10">평점 : {detailData.vote_average}</p>
                    <p className="mt-8">
                        장르 :
                        {detailData.genres.map((el, index) => (
                            <span
                                key={index}
                                className="mx-[3px]"
                            >
                                {el.name}
                            </span>
                        ))}
                    </p>
                    <p className="mt-8">{detailData.overview}</p>
                </div>
            </div>
        </MovieDetailContainer>
    );
};

export default MovieDetail;
