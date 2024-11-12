import {useState, useRef} from "react";
import supabase from "../supabase/supabase";
import {useNavigate} from "react-router-dom";

const MovieSignup = () => {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // 이메일과 비밀번호 에러 상태 관리
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);
    const navigate = useNavigate();

    // 비밀번호 유효성 검사
    const handlePasswordChange = () => {
        const password = passwordRef.current.value;

        if (password.length < 6) {
            setPasswordError("비밀번호는 6자 이상이어야 합니다");
        } else {
            setPasswordError(null);
        }
    };

    // 이메일 유효성 검사
    const handleEmailChange = () => {
        const email = emailRef.current.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 형식 정규식

        if (!emailRegex.test(email)) {
            setEmailError("유효한 이메일 주소를 입력하세요");
        } else {
            setEmailError(null);
        }
    };

    // 비밀번호확인 유효성 검사 함수
    const handlePassWordChange = () => {
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        if (password !== confirmPassword) {
            setConfirmPasswordError("비밀번호가 일치하지 않습니다");
        } else {
            setConfirmPasswordError(null);
        }
    };

    // 회원가입
    const signupFunction = async e => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        try {
            // 슈퍼베이스 회원가입
            const {data, error} = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name,
                    },
                },
            });

            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }
            // 회원가입 됬을때 홈으로 이동
            alert("회원가입이 완료되었습니다");
            navigate("/");
        } catch (error) {
            setError("회원가입 중 에러가 발생했습니다.");
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-20 border border-gray-500 w-full max-w-[300px] sm:max-w-[500px] rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-left w-500">회원가입</h2>
                <form
                    className="text-left space-y-10 mt-10"
                    onSubmit={signupFunction}
                >
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-md font-medium text-gray-700 mb-1"
                        >
                            사용자 이름
                        </label>
                        <input
                            ref={nameRef}
                            type="text"
                            name="username"
                            id="username"
                            className="w-full px-5 py-8 mt-4 border rounded-md"
                            placeholder="이름을 입력해주세요"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-md font-medium text-gray-700 mb-1"
                        >
                            이메일
                        </label>
                        <input
                            ref={emailRef}
                            type="email"
                            name="email"
                            id="email"
                            className="w-full px-5 py-8 mt-4 border rounded-md"
                            required
                            onChange={handleEmailChange}
                            placeholder="이메일을 입력해주세요"
                        />
                    </div>
                    {emailError && <p className="text-red text-md">{emailError}</p>}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-md font-medium text-gray-700 mb-1"
                        >
                            비밀번호
                        </label>
                        <input
                            ref={passwordRef}
                            type="password"
                            name="password"
                            id="password"
                            className="w-full px-5 py-8 mt-4 border rounded-md"
                            required
                            onChange={handlePasswordChange}
                            placeholder="비밀번호를 입력해주세요"
                        />
                    </div>
                    {passwordError && <p className="text-red text-md">{passwordError}</p>}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-md font-medium text-gray-700 mb-1"
                        >
                            비밀번호 확인
                        </label>
                        <input
                            ref={confirmPasswordRef}
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className="w-full px-5 py-8 mt-4 border rounded-md"
                            onChange={handlePassWordChange}
                            placeholder="비밀번호를 입력해주세요"
                        />
                    </div>
                    {confirmPasswordError && <p className="text-red text-md">{confirmPasswordError}</p>}
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
