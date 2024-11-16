import {useEffect} from "react";
import useDebounce from "../hook/useDebounce";
import {FetchSearchMovie} from "../RTK/thunk";
import {selectSortedSearchrMovies} from "../RTK/selector";
import {useDispatch, useSelector} from "react-redux";
import {setSearchData, clearSearchData, setSearchInput, setShowSearch} from "../RTK/slice";

const MovieInput = () => {
    const dispatch = useDispatch();
    const inputValue = useSelector(state => state.search.searchInput); // 슬라이스에서 인풋 상태 갖고오기
    const searchMovie = useSelector(selectSortedSearchrMovies); // 정렬된 검색 데이터

    // 디바운스를 적용한검색어
    const debounceSearch = useDebounce(inputValue, 1000);

    // 검색 api 호출
    useEffect(() => {
        console.log("debounceSearch", debounceSearch); // 디바운스 값 확인
        // 검색어가 있다면
        if (debounceSearch) {
            dispatch(FetchSearchMovie(debounceSearch)); // api 호출(검색어로)
            dispatch(setSearchData(searchMovie));
        } else {
            dispatch(clearSearchData());
        }
    }, [debounceSearch, dispatch]);

    // 입력 이벤트 핸들러
    const handleChange = e => {
        dispatch(setSearchInput(e.target.value));
    };

    // 버튼 클릭
    const handleClick = () => {
        dispatch(setShowSearch(true));
        dispatch(setSearchInput(""));
        dispatch(setSearchData(searchMovie));
    };
    return (
        <>
            <div className="relative hidden lg:block mr-20">
                <input
                    className="text-midnightBlack p-4 w-full pl-10"
                    type="text"
                    value={inputValue}
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
