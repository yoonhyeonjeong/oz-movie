import "./App.css";
import MovieDetail from "./components/MovieDetail";
import {Route, Routes} from "react-router-dom";
import {useState} from "react";
import MovieList from "./components/MovieList";
import MovieLogin from "./components/MovieLogin";
import MovieSignup from "./components/MovieSignup";
import MoviePopular from "./components/MoviePopular";
import MovieNavBar from "./components/MovieNavBar";
function App() {
    // 검색데이터 상태
    const [searchData, setSearchData] = useState([]);
    // 검색 보여주기
    const [showSearch, setShowSearch] = useState(false);
    return (
        <>
            <MovieNavBar
                searchData={searchData}
                setSearchData={setSearchData}
                showSearch={showSearch}
                setShowSearch={setShowSearch}
            />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <MovieList />
                            <MoviePopular
                                showSearch={showSearch}
                                searchData={searchData}
                            />
                        </>
                    }
                />
                <Route
                    path="/movie/:id"
                    element={<MovieDetail />}
                />
                <Route
                    path="/login"
                    element={<MovieLogin />}
                />
                <Route
                    path="/signup"
                    element={<MovieSignup />}
                />
            </Routes>
        </>
    );
}

export default App;
