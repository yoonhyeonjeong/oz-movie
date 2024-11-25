import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const APIKEY = import.meta.env.VITE_TMDB_API_KEY;
// 인기영화
export const fetchPopularMovie = createAsyncThunk("movies/fetchPopularMovie", async (page, {rejectWithValue}) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
            params: {
                api_key: APIKEY,
                language: "ko-KR",
                page,
            },
        });
        console.log(response.data.results);
        return response.data.results;
    } catch (error) {
        console.error("영화 데이터를 가져오는 중 오류 발생:", error);
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});
// 디테일
export const fetchDetailMovie = createAsyncThunk("movies/fetchDetailMovie", async (movie_id, {rejectWithValue}) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}`, {
            params: {
                api_key: APIKEY,
                language: "ko-KR",
            },
        });
        return response.data;
    } catch (error) {
        console.error("영화 디테일 페이지를 가져오는 중 오류 발생:", error);
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});
// 검색
export const FetchSearchMovie = createAsyncThunk("movies/FetchSearchMovie", async (query, {rejectWithValue}) => {
    try {
        const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
            params: {
                api_key: APIKEY,
                language: "ko-KR",
                query: query, // 검색어 쿼리파라미터로 전달
            },
        });
        return response.data;
    } catch (error) {
        console.error("검색하는중 오류 발생:", error);
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});
// 개봉
export const fetchReleaseMovie = createAsyncThunk("movies/fetchReleaseMovie", async (query, {rejectWithValue}) => {
    try {
        const response = await axios.get("https://api.themoviedb.org/3/movie/upcoming", {
            params: {
                api_key: APIKEY,
                language: "ko-KR",
            },
        });
        return response.data;
    } catch (error) {
        console.error("영화 개봉 데이터를 가져오는중 오류 발생:", error);
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});
