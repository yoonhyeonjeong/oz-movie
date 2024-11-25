import {useEffect} from "react";
import useDebounce from "../hook/useDebounce";
import {FetchSearchMovie} from "../RTK/thunk";
import {selectSortedSearchrMovies} from "../RTK/selector";
import {useDispatch, useSelector} from "react-redux";
import {setSearchData, clearSearchData, setSearchInput, setSearchVisible, setReleaseVisible} from "../RTK/slice";

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

    useEffect(() => {
        // `searchMovie` 상태가 변경될 때 `searchData` 업데이트
        dispatch(setSearchData(searchMovie));
    }, [searchMovie, dispatch]);

    // 입력 이벤트 핸들러
    const handleChange = e => {
        dispatch(setSearchInput(e.target.value));
    };

    // 버튼 클릭
    const handleClick = () => {
        if (!inputValue) {
            alert("검색어를 입력해주세요!!");
            return;
        } else {
            dispatch(setSearchVisible(true));
            dispatch(setSearchData(searchMovie));
            alert("검색이 완료되었습니다");
            dispatch(setReleaseVisible(false));
        }
    };
    return (
        <>
            <div className="relative flex items-start justify-center py-80 px-20 pb-30 bg-midnightBlack">
                <input
                    className="text-midnightBlack p-4 w-full pl-10 h-50 text-lg"
                    type="text"
                    value={inputValue}
                    placeholder="영화제목을 입력하세요"
                    onChange={handleChange}
                />
                <button
                    className="absolute right-20 pointer-events-auto w-30 h-30 pt-13"
                    onClick={handleClick}
                >
                    🔍
                </button>
            </div>
        </>
    );
};

export default MovieInput;
