import {useState, useEffect} from "react";
import useDebounce from "../hook/useDebounce";
import {FetchSearchMovie} from "../api/api";
const MovieInput = ({searchData, setSearchData, showSearch, setShowSearch}) => {
    // 인풋 상태
    const [search, setSearch] = useState("");
    const handleChange = e => {
        setSearch(e.target.value);
    };

    // 디바운스를 적용한검색어
    const debounceSearch = useDebounce(search, 3000);

    // api 호출
    useEffect(() => {
        // 검색어가 있을때만 api 호출
        if (debounceSearch) {
            FetchSearchMovie(debounceSearch).then(data => {
                if (data) {
                    const sortedMovies = data.results.map(movie => ({
                        ...movie,
                        vote_average: movie.vote_average.toFixed(1),
                    }));
                    setSearchData(sortedMovies);
                }
            });
        } else {
            // 검색어가 비었을 때는 searchData를 빈 배열로 설정
            setSearchData([]);
        }
    }, [debounceSearch, setSearchData]);
    // 버튼 클릭
    const handleClick = () => {
        setShowSearch(true);
    };
    return (
        <>
            <div className="ml-auto relative hidden lg:block">
                <input
                    className="text-midnightBlack p-4 w-full pl-10"
                    type="text"
                    value={search}
                    placeholder="영화제목을 입력하세요"
                    onChange={handleChange}
                />
                <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    onClick={handleClick}
                >
                    🔍
                </button>
            </div>
        </>
    );
};

export default MovieInput;
