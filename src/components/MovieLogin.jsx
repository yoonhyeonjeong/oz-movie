const MovieLogin = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-20 border border-gray-500 w-full max-w-[300px] sm:max-w-[500px] rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-left w-500">로그인</h2>
                <form className="text-left space-y-5">
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
