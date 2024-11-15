import {createSelector} from "@reduxjs/toolkit";
// 데이터 읽기, 정렬, 필터링, 계산/ 변환시, 여러컴포넌트에서 같은 데이터가 필요할때
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
