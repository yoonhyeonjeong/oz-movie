import {createSelector} from "@reduxjs/toolkit";
// 데이터 읽기, 정렬, 필터링, 계산/ 변환시, 여러컴포넌트에서 같은 데이터가 필요할때

// 개봉 영화 정렬
export const selectSortedReleaseMovies = createSelector(
    state => state.movies.releaseMovie,
    releaseMovie =>
        [...releaseMovie]
            .sort((a, b) => b.vote_average - a.vote_average)
            .map(movie => ({
                ...movie,
                vote_average: Number(movie.vote_average).toFixed(1),
            }))
);

// 인기순 영화 정렬
export const selectSortedPopularMovies = createSelector(
    state => state.movies.popularMovie,
    popularMovie =>
        [...popularMovie]
            .sort((a, b) => b.vote_average - a.vote_average)
            .map(movie => ({
                ...movie,
                vote_average: Number(movie.vote_average).toFixed(1),
            }))
);

// 디테일 영화 정렬
export const selectSortedDetailMovies = createSelector(
    state => state.movies.detailMovie,

    detailMovie => {
        if (!detailMovie) return null;

        return {
            ...detailMovie,
            vote_average: Number(detailMovie.vote_average).toFixed(1),
        };
    }
);

// 검색 영화 정렬
export const selectSortedSearchrMovies = createSelector(
    state => state.movies.searchMovie,
    searchMovie =>
        [...searchMovie]
            .sort((a, b) => b.vote_average - a.vote_average)
            .map(movie => ({
                ...movie,
                vote_average: Number(movie.vote_average).toFixed(1),
            }))
);
