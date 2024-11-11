import {useEffect, useState} from "react";
import {fetchPopularMovie} from "../api/api";
import {Link} from "react-router-dom";
import MovieCard from "./MovieCard";
const MoviePopular = ({showSearch, searchData}) => {
    const [popularData, setPopularData] = useState([]);
    useEffect(() => {
        fetchPopularMovie().then(data => {
            if (data) {
                const sortedMovies = data.results
                    .sort((a, b) => b.vote_average - a.vote_average)
                    .map(movie => ({
                        ...movie,
                        vote_average: movie.vote_average.toFixed(1),
                    }));
                setPopularData(sortedMovies);
            }
        });
    }, []);

    return (
        <div className="p-40">
            <h1 className="text-3xl font-semibold text-left mb-20">{showSearch ? `검색결과 총 ${searchData.length}건` : "인기순 20"}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {showSearch
                    ? searchData.map(el => (
                          <Link
                              to={`/movie/${el.id}`}
                              key={el.id}
                          >
                              <MovieCard data={el} />
                          </Link>
                      ))
                    : popularData.map(el => (
                          <Link
                              to={`/movie/${el.id}`}
                              key={el.id}
                          >
                              <MovieCard data={el} />
                          </Link>
                      ))}
            </div>
        </div>
    );
};

export default MoviePopular;
