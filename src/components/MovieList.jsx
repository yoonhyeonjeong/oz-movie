import MovieCard from "./MovieCard";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Autoplay} from "swiper/modules";
import {fetchPopularMovie} from "../api/api";
import {Link} from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import {useEffect, useState} from "react";

const MovieList = () => {
    const [popularData, setPopularData] = useState([]);
    useEffect(() => {
        fetchPopularMovie().then(data => setPopularData(data.results));
    }, []);
    return (
        <div className="p-40 mt-70 relative">
            <h1 className="text-3xl font-semibold text-left mb-20">인기순</h1>
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{delay: 3000, disableOnInteraction: false}}
                breakpoints={{
                    640: {
                        slidesPerView: 1, // 640px 이하에서는 1개의 슬라이드
                        spaceBetween: 10, // 작은 화면에서 간격 좁히기
                    },
                    768: {
                        slidesPerView: 2, // 768px 이상에서는 2개의 슬라이드
                        spaceBetween: 15, // 적당한 간격
                    },
                    1024: {
                        slidesPerView: 3, // 1024px 이상에서는 3개의 슬라이드
                        spaceBetween: 20, // 좀 더 넓은 간격
                    },
                    1280: {
                        slidesPerView: 4, // 1280px 이상에서는 4개의 슬라이드
                        spaceBetween: 25, // 넓은 간격
                    },
                    1440: {
                        slidesPerView: 5, // 1440px 이상에서는 5개의 슬라이드
                        spaceBetween: 30, // 가장 넓은 간격
                    },
                }}
            >
                {popularData && popularData.length > 0 ? (
                    popularData.map(el => (
                        <SwiperSlide key={el.id}>
                            <Link to={`/movie/${el.id}`}>
                                <MovieCard data={el} />
                            </Link>
                        </SwiperSlide>
                    ))
                ) : (
                    <div>인기 영화를 불러오는 중입니다...</div>
                )}
            </Swiper>
        </div>
    );
};

export default MovieList;
