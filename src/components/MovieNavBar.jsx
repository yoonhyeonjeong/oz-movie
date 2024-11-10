import {Link} from "react-router-dom";
import MovieInput from "./MovieInput";
import {useState} from "react";
import MovieSearchList from "./MovieSearchList";
const MovieNavBar = () => {
    // 검색데이터 상태
    const [searchData, setSearchData] = useState([]);
    return (
        <>
            <nav className="bg-midnightBlack text-white flex gap-x-8 p-20 text-18 fixed top-0 left-0 w-full z-10">
                <Link to={"/"}>홈</Link>
                <Link to={"/login"}>로그인</Link>
                <Link to={"/signup"}>회원가입</Link>
                <MovieInput
                    searchData={searchData}
                    setSearchData={setSearchData}
                />
            </nav>
            {searchData.length > 0 && <MovieSearchList searchData={searchData} />}
        </>
    );
};

export default MovieNavBar;
