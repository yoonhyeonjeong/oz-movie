import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {detailMovie} from "../api/api";
import styled from "styled-components";
const MovieDetailContainer = styled.div`
    background-image: ${({backgroundImage}) => `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`};
    .word-keep-all {
        word-break: keep-all;
    }
    /* 태블릿 화면 (600px 이상, 1024px 이하) */

    /* @media (min-width: 600px) and (max-width: 1024px) {
        padding: 30px;
    } */

    /* 모바일 화면 (600px 이하) */
    @media (max-width: 600px) {
        .movie-detail {
            padding-top: 30px;
            flex-direction: column;
        }
        .img > img {
            width: 250px;
        }
        .text-left {
            margin-top: 30px;
        }
        .overview {
            display: none;
        }
    }
`;
const MovieDetail = () => {
    const {id} = useParams(); // URL에서 id 파라미터를 가져옴
    const [detailData, setDetailData] = useState(null);
    const baseUrl = "https://image.tmdb.org/t/p/w500";
    useEffect(() => {
        detailMovie(id)
            .then(data => {
                const formattedData = {
                    ...data,
                    vote_average: data.vote_average.toFixed(1),
                };
                setDetailData(formattedData);
            })
            .catch(error => {
                console.log("API 호출 중 오류 발생:", error);
            });
    }, [id]);

    if (!detailData) {
        return <div>Loading...</div>;
    }
    console.log(detailData);
    return (
        <MovieDetailContainer
            backgroundImage={baseUrl + detailData.backdrop_path}
            className="flex items-center justify-center h-[100vh] bg-cover bg-center"
        >
            <div className="movie-detail flex items-center justify-center backdrop-blur-lg bg-black bg-opacity-60 text-white max-w-4xl md:max-w-3xl sm:max-w-full overflow-hidden">
                <div className="img">
                    <img
                        src={baseUrl + detailData.poster_path}
                        alt={detailData.title}
                        className="w-[400px] max-w-none"
                    />
                </div>
                <div className="text-left ml-[20px]">
                    <p className="text-3xl word-keep-all">{detailData.title}</p>
                    {detailData.tagline && <p className="text-2xl mt-8">{detailData.tagline}</p>}
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
                    <p className="mt-8">개봉일 : {detailData.release_date}</p>
                    <p className="mt-8 leading-relaxed line-clamp-6 overflow-hidden overview">{detailData.overview}</p>
                </div>
            </div>
        </MovieDetailContainer>
    );
};

export default MovieDetail;
