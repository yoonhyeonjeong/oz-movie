import "./App.css";
import MovieDetail from "./components/MovieDetail";
import {Route, Routes} from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieNavBar from "./components/MovieNavBar";
import MovieLogin from "./components/MovieLogin";
import MovieSignup from "./components/MovieSignup";
function App() {
    return (
        <>
            <MovieNavBar />
            <Routes>
                <Route
                    path="/"
                    element={<MovieList />}
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
