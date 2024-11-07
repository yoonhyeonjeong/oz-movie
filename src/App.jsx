import "./App.css";
import MovieDetail from "./components/MovieDetail";
import {Route, Routes} from "react-router-dom";
import MovieList from "./components/MovieList";

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={<MovieList />}
            />
            <Route
                path="/movie/:id"
                element={<MovieDetail />}
            />
        </Routes>
    );
}

export default App;
