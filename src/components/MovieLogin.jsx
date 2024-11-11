import {useRef, useState} from "react";
import supabase from "../supabase/supabase"; // Supabase 클라이언트 가져오기
import {useNavigate} from "react-router-dom"; // 리디렉션을 위한 React Router 사용

const MovieLogin = () => {
    const emailRef = useRef(null); // 이메일 입력 필드에 대한 ref
    const passwordRef = useRef(null); // 비밀번호 입력 필드에 대한 ref
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async e => {
        e.preventDefault();
        setError("");

        const email = emailRef.current.value; // ref로 이메일 값 가져오기
        const password = passwordRef.current.value; // ref로 비밀번호 값 가져오기

        try {
            const {user, session, error} = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            // 로그인 성공 후 홈 화면으로 리디렉션
            navigate("/home"); // 홈 화면 또는 원하는 페이지로 리디렉션
        } catch (err) {
            setError("로그인 실패: " + err.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-20 border border-gray-500 w-full max-w-[300px] sm:max-w-[500px] rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-left w-500">로그인</h2>
                <form
                    className="text-left space-y-5"
                    onSubmit={handleLogin}
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            이메일
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            ref={emailRef} // ref로 이메일 필드에 연결
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            비밀번호
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            ref={passwordRef} // ref로 비밀번호 필드에 연결
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full !mt-20 bg-red text-white font-bold rounded-md p-10"
                    >
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MovieLogin;
