import "./App.css";
import MovieDetail from "./components/MovieDetail";
import {Route, Routes} from "react-router-dom";
import {useState, useEffect} from "react";
import supabase from "./supabase/supabase";
import MovieList from "./components/MovieList";
import MovieLogin from "./components/MovieLogin";
import MovieSignup from "./components/MovieSignup";
import MoviePopular from "./components/MoviePopular";
import MovieNavBar from "./components/MovieNavBar";
function App() {
    // 로그인 상태
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // console.log(isLoggedIn);
    // 세션 상태 확인 및 유지
    useEffect(() => {
        // 현재 세션 확인
        const checkSession = async () => {
            const {
                data: {session},
            } = await supabase.auth.getSession();
            setIsLoggedIn(!!session);
        };

        checkSession();

        // 세션 변경 이벤트 리스너
        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsLoggedIn(!!session);
        });

        // 클린업
        return () => subscription.unsubscribe();
    }, []);
    return (
        <>
            <MovieNavBar
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
            />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <MovieList />
                            <MoviePopular />
                        </>
                    }
                />
                <Route
                    path="/movie/:id"
                    element={<MovieDetail />}
                />
                <Route
                    path="/login"
                    element={
                        <MovieLogin
                            setIsLoggedIn={setIsLoggedIn}
                            isLoggedIn={isLoggedIn}
                        />
                    }
                />
                <Route
                    path="/signup"
                    element={<MovieSignup />}
                />
            </Routes>
        </>
    );
}

export default App;
