import {useState, useEffect} from "react";
import useDebounce from "../hook/useDebounce";
import {FetchSearchMovie} from "../api/api";
const MovieInput = ({searchData, setSearchData}) => {
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
            FetchSearchMovie(debounceSearch).then(data => setSearchData(data.results));
        } else {
            // 검색어가 비었을 때는 searchData를 빈 배열로 설정
            setSearchData([]);
        }
    }, [debounceSearch, setSearchData]);
    return (
        <>
            <div className="ml-auto relative">
                <input
                    className="text-midnightBlack p-4 w-300 pl-10"
                    type="text"
                    value={search}
                    placeholder="영화제목을 입력하세요"
                    onChange={handleChange}
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2">🔍</span>
            </div>
        </>
    );
};

export default MovieInput;
