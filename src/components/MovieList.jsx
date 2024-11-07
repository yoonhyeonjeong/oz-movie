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
        <div className="p-4">
            <h2>인기 영화 20</h2>
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{delay: 3000, disableOnInteraction: false}}
                spaceBetween={20}
                slidesPerView={5}
                loop={true}
                className="mySwiper"
            >
                {popularData.map(el => (
                    <SwiperSlide key={el.id}>
                        <Link to={`/movie/${el.id}`}>
                            <MovieCard data={el} />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MovieList;
