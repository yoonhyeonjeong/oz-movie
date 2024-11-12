import {Link} from "react-router-dom";
import MovieInput from "./MovieInput";
import {useState} from "react";
import MovieSearchList from "./MovieSearchList";
import MovieLoginStatus from "./MovieLoginStatus";

const MovieNavBar = ({searchData, setSearchData, showSearch, setShowSearch, isLoggedIn, setIsLoggedIn}) => {
    // 햄버거 메뉴 상태
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // 메뉴 열릴 때 body 스크롤 방지
    if (isMenuOpen) {
        document.body.style.overflow = "hidden"; // 메뉴 열리면 스크롤 비활성화
    } else {
        document.body.style.overflow = "auto"; // 메뉴 닫히면 스크롤 활성화
    }

    return (
        <>
            <nav className="bg-midnightBlack text-white flex items-center gap-x-8 p-20 text-18 fixed top-0 left-0 w-full z-[60] transition-all duration-300">
                <Link
                    to={"/"}
                    onClick={() => {
                        setSearchData([]);
                        setShowSearch(false);
                    }}
                    className={`${isMenuOpen ? "opacity-0 pointer-events-none" : ""}`}
                >
                    MOVIEMOVIE
                </Link>

                <div className="ml-auto flex items-center justify-center">
                    <MovieInput
                        searchData={searchData}
                        setSearchData={setSearchData}
                        showSearch={showSearch}
                        setShowSearch={setShowSearch}
                    />
                    {/* 로그인 안했을때 기본 */}
                    {!isLoggedIn && (
                        <div className="flex gap-10 sm:flex hidden">
                            <Link
                                to={"/login"}
                                onClick={() => {
                                    setSearchData([]);
                                    setShowSearch(false);
                                }}
                                className={`${isMenuOpen ? "opacity-0 pointer-events-none" : ""}`}
                            >
                                로그인
                            </Link>
                            <Link
                                to={"/signup"}
                                onClick={() => {
                                    setSearchData([]);
                                    setShowSearch(false);
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
                    className="sm:hidden text-white text-[30px] ml-auto w-[30px] h-[30px] flex items-center justify-center mt-[-5px] fixed top-[20px] right-[20px] z-[999999]"
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
                            setSearchData([]);
                            setIsMenuOpen(false);
                        }}
                    >
                        홈
                    </Link>
                    <Link
                        to={"/login"}
                        className="mb-4"
                        onClick={() => {
                            setSearchData([]);
                            setIsMenuOpen(false);
                        }}
                    >
                        로그인
                    </Link>
                    <Link
                        to={"/signup"}
                        className="mb-4"
                        onClick={() => {
                            setSearchData([]);
                            setIsMenuOpen(false);
                        }}
                    >
                        회원가입
                    </Link>
                </nav>
            )}

            {/* 검색결과리스트 */}
            {searchData.length > 0 && <MovieSearchList searchData={searchData} />}
        </>
    );
};

export default MovieNavBar;
