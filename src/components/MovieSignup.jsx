import {useState, useRef} from "react";
import supabase from "../supabase/supabase";

const MovieSignup = () => {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const signupFunction = async e => {
        e.preventDefault();
        setLoading(true);
        setError(null); // 기존의 오류 메시지 초기화

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        // 비밀번호 일치 여부 체크
        if (password !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다");
            setLoading(false); // 로딩 상태 해제
            return;
        }

        // 비밀번호 길이 체크
        if (password.length < 6) {
            setError("비밀번호는 6자 이상이어야 합니다");
            setLoading(false); // 로딩 상태 해제
            return;
        }

        try {
            // 회원가입
            const {data, error} = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        name: name,
                    },
                },
            });

            if (error) {
                console.error("회원가입 오류:", error.message);
                setError(error.message);
                setLoading(false);
                return;
            }

            console.log("회원가입 성공:", data);
        } catch (error) {
            console.error("회원가입 중 에러 발생:", error);
            setError("회원가입 중 에러가 발생했습니다.");
        } finally {
            setLoading(false); // 로딩 상태 해제
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-20 border border-gray-500 w-full max-w-[300px] sm:max-w-[500px] rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-left w-500">회원가입</h2>
                <form
                    className="text-left space-y-5"
                    onSubmit={signupFunction}
                >
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            사용자 이름
                        </label>
                        <input
                            ref={nameRef}
                            type="text"
                            name="username"
                            id="username"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            이메일
                        </label>
                        <input
                            ref={emailRef}
                            type="email"
                            name="email"
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
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
                            ref={passwordRef}
                            type="password"
                            name="password"
                            id="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            비밀번호 확인
                        </label>
                        <input
                            ref={confirmPasswordRef}
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="w-full !mt-20 bg-red text-white font-bold rounded-md p-10"
                        disabled={loading}
                    >
                        {loading ? "회원가입 중..." : "회원가입"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MovieSignup;
