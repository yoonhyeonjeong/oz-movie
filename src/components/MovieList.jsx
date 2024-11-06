import MovieCard from "./MovieCard";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css"; // 기본 스타일
import "swiper/css/navigation"; // 네비게이션 스타일
import "swiper/css/pagination"; // 페이지네이션 스타일
import "swiper/css/autoplay"; // 자동 재생 스타일

// 개별 모듈 가져오기
import {Navigation, Pagination, Autoplay} from "swiper";

const MovieList = ({data}) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]} // 여기서 모듈을 지정
            navigation
            pagination={{clickable: true}}
            autoplay={{delay: 3000}}
            spaceBetween={20}
        >
            {data.results.map((el, index) => (
                <SwiperSlide key={index}>
                    <MovieCard data={el} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default MovieList;
