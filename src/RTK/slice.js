import {createSlice} from "@reduxjs/toolkit";
import {fetchPopularMovie, fetchDetailMovie, FetchSearchMovie, fetchReleaseMovie} from "./thunk";

// 초기상태
const initialState = {
    popularMovie: [], // 인기영화
    detailMovie: [], // 디테일
    searchMovie: [], // 검색
    releaseMovie: [], // 개봉
    status: "idle", // 요청이 시작되지않은상태
    error: null,
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    extraReducers: builder => {
        builder
            // 인기영화 진행중
            .addCase(fetchPopularMovie.pending, state => {
                state.status = "loading";
            })
            // 성공
            .addCase(fetchPopularMovie.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.popularMovie = action.payload.results; // 데이터저장
            })
            // 실패
            .addCase(fetchPopularMovie.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Unknown error";
            })
            // 디테일 진행중
            .addCase(fetchDetailMovie.pending, state => {
                state.status = "loading";
            })
            // 성공
            .addCase(fetchDetailMovie.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.detailMovie = action.payload.results; // 데이터저장
            })
            // 실패
            .addCase(fetchDetailMovie.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Unknown error";
            })
            // 검색 진행중
            .addCase(FetchSearchMovie.pending, state => {
                state.status = "loading";
            })
            // 성공
            .addCase(FetchSearchMovie.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.searchMovie = action.payload.results; // 데이터저장
            })
            // 실패
            .addCase(FetchSearchMovie.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Unknown error";
            })
            // 개봉 진행중
            .addCase(fetchReleaseMovie.pending, state => {
                state.status = "loading";
            })
            // 성공
            .addCase(fetchReleaseMovie.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.releaseMovie = action.payload.results; // 데이터저장
            })
            // 실패
            .addCase(fetchReleaseMovie.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Unknown error";
            });
    },
});

export default movieSlice.reducer;