import MovieCard from "./MovieCard";
import styled from "styled-components";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
const MovieSearchContainer = styled.div`
    img {
        object-fit: cover;
        width: 100%;
        height: auto; /* 비율 유지 */
    }
    .movie-average {
        display: none;
    }
    .search-list {
        display: flex;
        flex-wrap: nowrap;
        gap: 16px;
        padding-bottom: 8px;
        overflow-x: auto;
        justify-content: flex-start;
        scrollbar-color: #888 #121212;

        a {
            flex: 0 0 calc(20% - 16px);
            max-width: calc(20% - 16px);
            display: flex;
            align-items: center;
            justify-content: center;
            > div {
                width: 100%;
            }
        }
    }

    /* 모바일 화면 (600px 이하) */
    @media (max-width: 600px) {
        .search-list {
            a {
                flex: 0 0 calc(50% - 16px);
                max-width: calc(50% - 16px);
            }
        }
    }
`;
const MovieSearchList = ({searchData}) => {
    const location = useLocation();
    // 현재 URL이 `/movie`로 시작되면 (링크로 디테일페이지 갔을때 , true false 반환)
    const isDetailPage = location.pathname.startsWith("/movie");
    const inputValue = useSelector(state => state.search.searchInput); // 슬라이스에서 인풋 상태 갖고오기
    return (
        !isDetailPage && (
            <MovieSearchContainer className="pt-20 bg-midnightBlack text-white px-50">
                <p className="text-3xl">"{inputValue}"의 검색결과</p>
                <div className="search-list flex items-start gap-x-8 mt-30">
                    {searchData &&
                        searchData.length > 0 &&
                        searchData.map(el => (
                            <Link
                                key={el.id}
                                to={`/movie/${el.id}`}
                            >
                                <MovieCard data={el} />
                            </Link>
                        ))}
                </div>
            </MovieSearchContainer>
        )
    );
};

export default MovieSearchList;
