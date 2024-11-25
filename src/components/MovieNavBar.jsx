import {Link} from "react-router-dom";
import MovieInput from "./MovieInput";
import {useState, useEffect} from "react";
import MovieSearchList from "./MovieSearchList";
import MovieLoginStatus from "./MovieLoginStatus";
import {useDispatch, useSelector} from "react-redux";
import {clearSearchData, toggleTheme, setSearchVisible, setReleaseVisible, setInputVisible} from "../RTK/slice";
import {MdDarkMode, MdOutlineDarkMode} from "react-icons/md";

const MovieNavBar = ({isLoggedIn, setIsLoggedIn}) => {
    const dispatch = useDispatch();
    const inputVisible = useSelector(state => state.search.isInputVisible); // 슬라이스에서 인풋 상태 갖고오기
    // 다크모드
    const isDarkMode = useSelector(state => state.theme.isDarkMode); // 슬라이스에서 다크모드 상태 갖고오기
    // 햄버거 메뉴 상태
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const searchData = useSelector(state => state.search.searchData);
    // 메뉴 열릴 때 body 스크롤 방지
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isMenuOpen]);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
        console.log(isDarkMode);
    }, [isDarkMode]);

    return (
        <>
            <nav className="bg-midnightBlack text-white flex items-center gap-x-8 p-20 text-18 fixed top-0 left-0 w-full z-[60] transition-all duration-300">
                <Link
                    to={"/"}
                    onClick={() => {
                        console.log("Clear Search Data Triggered");
                        dispatch(clearSearchData());
                        dispatch(setSearchVisible());
                        dispatch(setReleaseVisible(true));
                        dispatch(setInputVisible(false));
                    }}
                    className={`${isMenuOpen ? "opacity-0 pointer-events-none" : ""}`}
                >
                    MOVIEMOVIE
                </Link>

                <div className="ml-auto flex items-center justify-center">
                    <button
                        className="pr-10"
                        onClick={() => {
                            dispatch(toggleTheme());
                        }}
                    >
                        {isDarkMode ? <MdDarkMode /> : <MdOutlineDarkMode />}
                    </button>
                    <button
                        className="pr-10"
                        onClick={() => {
                            dispatch(setInputVisible(!inputVisible));
                        }}
                    >
                        검색
                    </button>

                    {/* 로그인 안했을때 기본 */}
                    {!isLoggedIn && (
                        <div className="flex gap-10 sm:flex hidden">
                            <Link
                                to={"/login"}
                                onClick={() => {
                                    dispatch(clearSearchData());
                                    dispatch(setSearchVisible());
                                }}
                                className={`${isMenuOpen ? "opacity-0 pointer-events-none" : ""}`}
                            >
                                로그인
                            </Link>
                            <Link
                                to={"/signup"}
                                onClick={() => {
                                    dispatch(clearSearchData());
                                    dispatch(setSearchVisible());
                                }}
                                className={`${isMenuOpen ? "opacity-0 pointer-events-none" : ""}`}
                            >
                                회원가입
                            </Link>
                        </div>
                    )}
                </div>

                <MovieLoginStatus
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                />

                {/* 햄버거 버튼 */}
                <button
                    className="sm:hidden text-white text-[30px] ml-auto w-[30px] h-[30px] flex items-center justify-center mt-[-5px] fixed top-[20px] right-[20px] z-[999999] pl-30"
                    onClick={() => setIsMenuOpen(prev => !prev)}
                >
                    {isMenuOpen ? "✕" : "☰"}
                </button>
            </nav>

            {/* 모바일메뉴 */}
            {isMenuOpen && (
                <nav className="lg:hidden bg-midnightBlack text-white absolute top-0 left-0 w-full h-full z-[50] flex flex-col items-center justify-center pointer-events-auto">
                    <Link
                        to={"/"}
                        className="mb-4"
                        onClick={() => {
                            dispatch(clearSearchData());
                            dispatch(setSearchVisible());
                        }}
                    >
                        홈
                    </Link>
                    <Link
                        to={"/login"}
                        className="mb-4"
                        onClick={() => {
                            dispatch(clearSearchData());
                            dispatch(setSearchVisible());
                        }}
                    >
                        로그인
                    </Link>
                    <Link
                        to={"/signup"}
                        className="mb-4"
                        onClick={() => {
                            dispatch(clearSearchData());
                            dispatch(setSearchVisible());
                        }}
                    >
                        회원가입
                    </Link>
                </nav>
            )}
            {/* 검색 인풋 */}
            {inputVisible && <MovieInput />}
            {/* 검색결과리스트 */}
            {searchData.length > 0 && <MovieSearchList searchData={searchData} />}
        </>
    );
};

export default MovieNavBar;
