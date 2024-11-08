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
                // autoplay={{delay: 3000, disableOnInteraction: false}}
                spaceBetween={20}
                slidesPerView={5}
                loop={true}
                className="mySwiper p-5"
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
