import {createSlice} from "@reduxjs/toolkit";
import {fetchPopularMovie, fetchDetailMovie, FetchSearchMovie, fetchReleaseMovie} from "./thunk";

export const movieSlice = createSlice({
    name: "movies",
    initialState: {
        popularMovie: [], // 인기영화
        detailMovie: [], // 디테일
        searchMovie: [], // 검색
        releaseMovie: [], // 개봉
        status: "idle", // 요청이 시작되지않은상태
        error: null,
    },
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
                state.detailMovie = action.payload; // 데이터저장
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
export const searchSlice = createSlice({
    name: "search",
    initialState: {
        searchData: [], // 검색된 영화 목록
        showSearchMovie: false, // 검색된 영화 목록 보여주기
        searchInput: "", // 검색 인풋
    },
    reducers: {
        setSearchData: (state, action) => {
            state.searchData = action.payload;
        },
        clearSearchData: state => {
            state.searchData = [];
        },
        setShowSearch: (state, action) => {
            state.showSearchMovie = action.payload;
        },
        setSearchInput: (state, action) => {
            state.searchInput = action.payload;
        },
    },
});
export const {setSearchData, clearSearchData, setShowSearch, setSearchInput} = searchSlice.actions;
