import {useEffect, useState} from "react";
import {fetchPopularMovie} from "../RTK/thunk";
import {selectSortedPopularMovies} from "../RTK/selector";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import MovieCard from "./MovieCard";
const MoviePopular = ({showSearch, searchData}) => {
    const dispatch = useDispatch();
    const popularMovie = useSelector(selectSortedPopularMovies);
    // 컴포넌트가 마운트될때 인기 영화 데이터 호출
    useEffect(() => {
        dispatch(fetchPopularMovie());
    }, [dispatch]);

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
                    : popularMovie.map(el => (
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
