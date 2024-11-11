import {Link} from "react-router-dom";
import MovieInput from "./MovieInput";
import {useState} from "react";
import MovieSearchList from "./MovieSearchList";

const MovieNavBar = ({searchData, setSearchData, showSearch, setShowSearch}) => {
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
            <nav
                className={`bg-midnightBlack text-white flex items-center gap-x-8 p-20 text-18 fixed top-0 left-0 w-full z-[50] transition-all duration-300 ${
                    isMenuOpen ? "hidden" : "" // 메뉴가 열리면 네브바 숨기기
                }`}
            >
                <Link
                    to={"/"}
                    onClick={() => {
                        setSearchData([]);
                        setShowSearch(false);
                    }}
                >
                    홈
                </Link>
                <Link
                    to={"/login"}
                    onClick={() => {
                        setSearchData([]);
                        setShowSearch(false);
                    }}
                >
                    로그인
                </Link>
                <Link
                    to={"/signup"}
                    onClick={() => {
                        setSearchData([]);
                        setShowSearch(false);
                    }}
                >
                    회원가입
                </Link>
                <MovieInput
                    searchData={searchData}
                    setSearchData={setSearchData}
                    showSearch={showSearch}
                    setShowSearch={setShowSearch}
                />

                {/* 햄버거 버튼 */}
                <button
                    className="sm:hidden text-white text-[30px] ml-auto w-[30px] h-[30px] flex items-center justify-center mt-[-5px] fixed top-[20px] right-[20px] z-[99999]"
                    onClick={() => setIsMenuOpen(prev => !prev)}
                >
                    {isMenuOpen ? "✕" : "☰"}
                </button>
            </nav>

            {/* 모바일메뉴 */}
            {isMenuOpen && (
                <nav className="lg:hidden bg-midnightBlack text-white absolute top-0 left-0 w-full h-full z-[9999] flex flex-col items-center justify-center pointer-events-auto">
                    <Link
                        to={"/"}
                        className="mb-4"
                        onClick={() => setSearchData([])}
                    >
                        홈
                    </Link>
                    <Link
                        to={"/login"}
                        className="mb-4"
                        onClick={() => setSearchData([])}
                    >
                        로그인
                    </Link>
                    <Link
                        to={"/signup"}
                        className="mb-4"
                        onClick={() => setSearchData([])}
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
