import {useState} from "react";
import MovieDetail from "./components/MovieDetail";
import {Route, Routes} from "react-router-dom";
import "./App.css";
import MovieListData from "./data/MovieListData.json";
import MovieList from "./components/MovieList";
function App() {
    const [data, setData] = useState(MovieListData);

    return (
        <Routes>
            <Route
                path="/"
                element={<MovieList data={data} />}
            />
            <Route
                path="/details"
                element={<MovieDetail />}
            />
        </Routes>
    );
}

export default App;
