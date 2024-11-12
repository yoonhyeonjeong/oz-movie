import {useRef, useState} from "react";
import supabase from "../supabase/supabase";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const MovieLogin = ({setIsLoggedIn, isLoggedIn}) => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            console.log(isLoggedIn);
            // isLoggedIn이 true로 변경되면 홈 페이지로 이동
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    // 로그인
    const handleLogin = async () => {
        setError("");

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            // 슈퍼베이스 이메일 비밀번호로 로그인하기
            const {user, session, error} = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            //  에러발생
            if (error) throw error;
            // 로그인 성공시
            setIsLoggedIn(true);
            alert("로그인 되었습니다");
            console.log("로그인 성공:", user);
        } catch (err) {
            console.log("로그인 실패:", err.message);
            setError("로그인 실패: " + err.message);
        }
    };

    // 슈퍼베이스 카카오 로그인
    const signInWithKakao = async () => {
        try {
            const {data, error} = await supabase.auth.signInWithOAuth({
                provider: "kakao",
                options: {
                    redirectTo: window.location.origin, // 현재 도메인으로 리디렉션
                },
            });
            // 로그인 성공시
            console.log("로그인 성공:", data);
            setIsLoggedIn(true);
            alert("로그인 되었습니다");
        } catch (err) {
            console.error("로그인 실패:", err.message);
            alert("로그인에 실패했습니다");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-20 border border-gray-500 w-full max-w-[300px] sm:max-w-[500px] rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-left w-500">로그인</h2>
                <form
                    className="text-left space-y-10"
                    onSubmit={handleLogin}
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-md font-medium text-gray-700 mb-1"
                        >
                            이메일
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            ref={emailRef}
                            placeholder="이메일을 입력해주세요"
                            className="w-full px-5 py-8 mt-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-md font-medium text-gray-700 mb-1"
                        >
                            비밀번호
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            ref={passwordRef}
                            placeholder="비밀번호를 입력해주세요"
                            className="w-full px-5 py-8 mt-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {error && <p className="text-red text-md">{error}</p>}

                    <button
                        type="button"
                        className="w-full !mt-20 bg-red text-white font-bold rounded-md p-10"
                        onClick={handleLogin}
                    >
                        로그인
                    </button>
                    <button
                        type="button"
                        className="w-full !mt-20 bg-yellow text-midnightBlack font-bold rounded-md p-10"
                        onClick={signInWithKakao}
                    >
                        카카오 로그인
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MovieLogin;
