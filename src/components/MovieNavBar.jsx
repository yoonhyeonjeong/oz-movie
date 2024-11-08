import {Link} from "react-router-dom";
const MovieNavBar = () => {
    return (
        <nav className="bg-midnightBlack text-white flex gap-x-8 p-20 text-18 fixed top-0 left-0 w-full z-10">
            <Link to={"/"}>홈</Link>
            <Link to={"/login"}>로그인</Link>
            <Link to={"/signup"}>회원가입</Link>
        </nav>
    );
};

export default MovieNavBar;
