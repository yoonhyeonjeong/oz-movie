import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {fetchDetailMovie} from "../RTK/thunk";
import {selectSortedDetailMovies} from "../RTK/selector";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
const MovieDetailContainer = styled.div`
    background-image: ${({bgImage}) => (bgImage ? `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url(${bgImage})` : "none")};
    .word-keep-all {
        word-break: keep-all;
    }

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
    const baseUrl = "https://image.tmdb.org/t/p/w500";
    const dispatch = useDispatch();
    const detailMovie = useSelector(selectSortedDetailMovies);
    useEffect(() => {
        dispatch(fetchDetailMovie(id));
    }, [id]);

    if (!detailMovie || !detailMovie.genres) {
        return <div className="flex items-center justify-center h-[100vh]">Loading...</div>;
    }

    return (
        <MovieDetailContainer
            bgImage={baseUrl + detailMovie.backdrop_path}
            className="flex items-center justify-center h-[100vh] bg-cover bg-center"
        >
            <div className="movie-detail flex items-center justify-center backdrop-blur-lg bg-black bg-opacity-60 text-white max-w-4xl md:max-w-3xl sm:max-w-full overflow-hidden">
                <div className="img">
                    <img
                        src={baseUrl + detailMovie.poster_path}
                        alt={detailMovie.title}
                        className="w-[400px] max-w-none"
                    />
                </div>
                <div className="text-left ml-[20px]">
                    <p className="text-3xl word-keep-all">{detailMovie.title}</p>
                    {detailMovie.tagline && <p className="text-2xl mt-8">{detailMovie.tagline}</p>}
                    <p className="mt-10">평점 : {detailMovie.vote_average}</p>
                    <p className="mt-8">
                        장르 :
                        {detailMovie.genres.map((el, index) => (
                            <span
                                key={index}
                                className="mx-[3px]"
                            >
                                {el.name}
                            </span>
                        ))}
                    </p>
                    <p className="mt-8">개봉일 : {detailMovie.release_date}</p>
                    <p className="mt-8 leading-relaxed line-clamp-6 overflow-hidden overview">{detailMovie.overview}</p>
                </div>
            </div>
        </MovieDetailContainer>
    );
};

export default MovieDetail;
