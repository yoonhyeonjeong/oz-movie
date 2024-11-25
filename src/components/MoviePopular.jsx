import {useEffect, useState, useRef} from "react";
import styled from "styled-components";
import {keyframes} from "styled-components";
import {fetchPopularMovie} from "../RTK/thunk";
import {selectSortedPopularMovies} from "../RTK/selector";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import MovieCard from "./MovieCard";
import useInfiniteScroll from "../hook/useInfiniteScroll.jsx";
const slideUp = keyframes`
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;
const MoviePopularContainer = styled.div`
    animation: ${({isReleaseVisible}) => (isReleaseVisible === false ? slideUp : "none")} 0.5s ease-out;
`;

const MoviePopular = () => {
    const dispatch = useDispatch();
    const popularMovie = useSelector(selectSortedPopularMovies); // 정렬된 인기 데이터
    const isSearchVisible = useSelector(state => state.search.isSearchVisible); // 슬라이스에서 검색된영화 상태 갖고오기
    const searchData = useSelector(state => state.search.searchData); // 슬라이스에서 검색된영화 상태 갖고오기
    const inputValue = useSelector(state => state.search.searchInput); // 슬라이스에서 인풋 상태 갖고오기
    const isReleaseVisible = useSelector(state => state.search.isReleaseVisible); // 슬라이스에서 개봉영화 상태 갖고오기
    const {page, isLoading, hasMore} = useSelector(state => state.infiniteScroll); // 슬라이스에서 상태 갖고오기
    const [animationKey, setAnimationKey] = useState(0); // 애니메이션 트리거용 state

    // 데이터 불러오기(page 값  전달)
    const loadMoreData = () => {
        dispatch(fetchPopularMovie(page));
    };
    const observerRef = useInfiniteScroll(loadMoreData, isLoading, hasMore);

    // 컴포넌트가 마운트될때 인기 영화 데이터 호출
    useEffect(() => {
        dispatch(fetchPopularMovie(1)); //초기 데이터 로드
    }, [dispatch]);
    // 검색어가 바뀔때마다 애니메이션 재 실행
    useEffect(() => {
        setAnimationKey(prev => prev + 1);
    }, [inputValue]);
    return (
        <MoviePopularContainer
            isReleaseVisible={isReleaseVisible}
            className="p-40"
            key={animationKey}
        >
            <h1 className="text-3xl font-semibold text-left mb-20">{isSearchVisible ? `"${inputValue}"의 검색결과 총 ${searchData.length}건` : "인기순 20"}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {isSearchVisible
                    ? searchData.map(el => (
                          <Link
                              to={`/movie/${el.id}`}
                              key={el.id}
                          >
                              <MovieCard data={el} />
                          </Link>
                      ))
                    : popularMovie.map(el => (
                          <Link
                              to={`/movie/${el.id}`}
                              key={el.id}
                          >
                              <MovieCard data={el} />
                          </Link>
                      ))}
                <div
                    ref={observerRef}
                    className="loading-indicator"
                >
                    {isLoading && <p>Loading...</p>}
                </div>
            </div>
        </MoviePopularContainer>
    );
};

export default MoviePopular;
