import MovieCard from "./MovieCard";
import styled from "styled-components";
import {Link, useLocation} from "react-router-dom";
const MovieSearchContainer = styled.div`
    img {
        width: 15rem;
        height: 20rem;
        object-fit: cover;
    }
    .movie-average {
        display: none;
    }
`;
const MovieSearchList = ({searchData}) => {
    const location = useLocation();
    const limitedSearchData = searchData.slice(0, 5); // 5개만 보여주기
    // 현재 URL이 `/movie`로 시작되면 (링크로 디테일페이지 갔을때 , true false 반환)
    const isDetailPage = location.pathname.startsWith("/movie");

    return (
        !isDetailPage && (
            <MovieSearchContainer className="flex items-start justify-center p-60 gap-x-8 mt-20 bg-midnightBlack text-white">
                {limitedSearchData &&
                    limitedSearchData.length > 0 &&
                    limitedSearchData.map(el => (
                        <Link
                            key={el.id}
                            to={`/movie/${el.id}`}
                        >
                            <MovieCard data={el} />
                        </Link>
                    ))}
            </MovieSearchContainer>
        )
    );
};

export default MovieSearchList;
