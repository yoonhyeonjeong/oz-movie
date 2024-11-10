import {useEffect, useState} from "react";
import {fetchPopularMovie} from "../api/api";
import MovieCard from "./MovieCard";
const MoviePopular = () => {
    const [popularData, setPopularData] = useState([]);
    useEffect(() => {
        fetchPopularMovie().then(data => setPopularData(data.results));
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-40">
            {popularData.map(el => (
                <MovieCard
                    key={el.id}
                    data={el}
                />
            ))}
        </div>
    );
};

export default MoviePopular;
