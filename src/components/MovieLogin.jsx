import styled from "styled-components";
const LoginContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    .login {
        padding: 20px;
        border: solid 1px gray;
        width: 100%;
        border-radius: 10px;
    }
    h2 {
        text-align: left;
    }
    form {
        text-align: left;
    }
    form div + div {
        margin-top: 20px;
    }
`;

const MovieLogin = () => {
    return (
        <LoginContainer>
            <div className="max-w-md login">
                <h2 className="text-2xl font-bold mb-6">로그인</h2>
                <form>
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-midnightBlack text-white font-bold rounded-md p-10 mt-30"
                    >
                        로그인
                    </button>
                </form>
            </div>
        </LoginContainer>
    );
};

export default MovieLogin;
