import axios from "axios";
const APIKEY = import.meta.env.VITE_TMDB_API_KEY;

// 인기영화
export async function fetchPopularMovie() {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
            params: {
                api_key: APIKEY,
                language: "ko-KR",
            },
        });
        return response.data;
    } catch (error) {
        console.error("영화 데이터를 가져오는 중 오류 발생:");
    }
}
// 디테일페이지
export async function detailMovie(movie_id) {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}`, {
            params: {
                api_key: APIKEY,
                language: "ko-KR",
            },
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("영화 디테일 페이지 데이터를 가져오는 중 오류 발생:");
    }
}
