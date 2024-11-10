import "./App.css";
import MovieDetail from "./components/MovieDetail";
import {Route, Routes} from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieLogin from "./components/MovieLogin";
import MovieSignup from "./components/MovieSignup";
import MoviePopular from "./components/MoviePopular";
import MovieNavBar from "./components/MovieNavBar";
function App() {
    return (
        <>
            <MovieNavBar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <MovieList />
                            <MoviePopular />
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
