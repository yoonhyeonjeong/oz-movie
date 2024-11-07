import {useEffect, useState} from "react";
import {fetchPopularMovie} from "../api/api";
import MovieCard from "./MovieCard";
const MoviePopular = () => {
    const [popularData, setPopularData] = useState([]);
    useEffect(() => {
        fetchPopularMovie().then(data => setPopularData(data.results));
    }, []);
    return popularData.map(el => (
        <MovieCard
            key={el.id}
            data={el}
        />
    ));
};

export default MoviePopular;
