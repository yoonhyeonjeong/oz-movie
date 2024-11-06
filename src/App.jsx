import {useState} from "react";
import {MovieListData} from "./data/MovieListData";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import "./App.css";

function App() {
    const [data, setData] = useState(MovieListData);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ul className="movie-list">
                        {data.results.map((el, index) => (
                            <MovieCard
                                key={index}
                                data={el}
                            />
                        ))}
                    </ul>
                }
            />
            <Route
                path="/details"
                element={<MovieDetail />}
            />
        </Routes>
    );
}

export default App;
