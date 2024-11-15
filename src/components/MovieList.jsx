import MovieCard from "./MovieCard";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Autoplay} from "swiper/modules";
import {fetchReleaseMovie} from "../RTK/thunk";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {selectSortedReleaseMovies} from "../RTK/selector";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import {useEffect} from "react";

const MovieList = () => {
    const dispatch = useDispatch();
    const releaseMovie = useSelector(selectSortedReleaseMovies);
    // 컴포넌트 마운트시 데이터를 불러옴
    useEffect(() => {
        dispatch(fetchReleaseMovie());
    }, [dispatch]);

    return (
        <div className="p-40 mt-70 relative">
            <h1 className="text-3xl font-semibold text-left mb-20">개봉예정 영화</h1>
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{delay: 3000, disableOnInteraction: false}}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    1280: {
                        slidesPerView: 4,
                        spaceBetween: 25,
                    },
                    1440: {
                        slidesPerView: 5,
                        spaceBetween: 30,
                    },
                }}
            >
                {releaseMovie && releaseMovie.length > 0 ? (
                    releaseMovie.map(el => (
                        <SwiperSlide key={el.id}>
                            <Link to={`/movie/${el.id}`}>
                                <MovieCard data={el} />
                            </Link>
                        </SwiperSlide>
                    ))
                ) : (
                    <div>개봉예정 영화들을 불러오는 중입니다...</div>
                )}
            </Swiper>
        </div>
    );
};

export default MovieList;
