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
            // // 인기영화 진행중
            // .addCase(fetchPopularMovie.pending, state => {
            //     state.status = "loading";
            // })
            // // 성공
            // .addCase(fetchPopularMovie.fulfilled, (state, action) => {
            //     state.status = "succeeded";
            //     state.popularMovie = action.payload.results; // 데이터저장
            // })
            // // 실패
            // .addCase(fetchPopularMovie.rejected, (state, action) => {
            //     state.status = "failed";
            //     state.error = action.payload || "Unknown error";
            // })
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
        isSearchVisible: false, // 검색된 영화 목록 보여주기
        searchInput: "", // 검색 인풋
        isReleaseVisible: true, // 개봉 영화 상태
        isInputVisible: false, // 검색 인풋 상태
    },
    reducers: {
        setSearchData: (state, action) => {
            state.searchData = action.payload;
        },
        clearSearchData: state => {
            state.searchData = [];
        },
        setSearchVisible: (state, action) => {
            state.isSearchVisible = action.payload;
        },
        setSearchInput: (state, action) => {
            state.searchInput = action.payload;
        },
        setReleaseVisible: (state, action) => {
            state.isReleaseVisible = action.payload;
        },
        setInputVisible: (state, action) => {
            state.isInputVisible = action.payload;
        },
    },
});
export const themeSlice = createSlice({
    name: "theme",
    initialState: {
        isDarkMode: localStorage.getItem("isDarkMode") === "true", // 로컬 스토리지에서 초기 상태 가져오기
    },
    reducers: {
        toggleTheme: state => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem("isDarkMode", state.isDarkMode); // 상태 변경 시 로컬 스토리지에 저장
        },
    },
});
// 무한스크롤
export const infiniteScrollSlice = createSlice({
    name: "infiniteScroll",
    initialState: {
        items: [],
        page: 1,
        isLoading: false,
        hasMore: true,
    },
    reducers: {
        resetState: state => {
            state.items = [];
            state.page = 1;
            state.hasMore = true;
        },
    },
    extraReducers: builder => {
        builder
            // 대기
            .addCase(fetchPopularMovie.pending, state => {
                state.isLoading = true;
            }) // 성공
            .addCase(fetchPopularMovie.fulfilled, (state, action) => {
                console.log(action.payload);
                state.status = "succeeded";
                state.items = [...state.items, ...action.payload.filter(item => !state.items.some(existingItem => existingItem.id === item.id))];
                state.page += 1;
                state.isLoading = false;
                state.hasMore = action.payload.length > 0; // 데이터 없으면종료
            })
            // 실패
            .addCase(fetchReleaseMovie.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Unknown error";
                state.isLoading = false;
            });
    },
});
export const {setSearchData, clearSearchData, setSearchVisible, setSearchInput, setReleaseVisible, setInputVisible} = searchSlice.actions;
export const {toggleTheme} = themeSlice.actions;
export const {resetState} = infiniteScrollSlice.actions;
