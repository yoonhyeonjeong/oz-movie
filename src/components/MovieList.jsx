import MovieCard from "./MovieCard";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Autoplay} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const MovieList = ({data}) => {
    return (
        <div className="p-4">
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{delay: 3000, disableOnInteraction: false}}
                spaceBetween={20}
                slidesPerView={4}
                loop={true}
                className="mySwiper"
            >
                {data.results.map((el, index) => (
                    <SwiperSlide key={index}>
                        <MovieCard data={el} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MovieList;
