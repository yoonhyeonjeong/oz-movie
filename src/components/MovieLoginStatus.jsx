import {FaUser} from "react-icons/fa6";
import styled from "styled-components";
import supabase from "../supabase/supabase";
const MovieLoginStatusContainer = styled.div`
    .login-box {
        display: flex;
        align-items: center;
        flex-direction: column;
        position: relative;
        ul {
            opacity: 0;
            position: absolute;
            top: 40px;
            left: -10%;
            transform: translateX(-50%);
            width: 100px;
            transition: all 0.3s;
            li {
                background: #111;
                padding: 10px;
            }
        }
        &:hover {
            ul {
                opacity: 1;
            }
        }
    }
`;

const MovieLoginStatus = ({isLoggedIn, setIsLoggedIn}) => {
    // 로그아웃
    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            setIsLoggedIn(false);
            alert("로그아웃 되었습니다.");
        } catch (error) {
            console.error("로그아웃 실패:", error.message);
            alert("로그아웃에 실패했습니다.");
        }
    };
    return (
        <MovieLoginStatusContainer>
            {isLoggedIn && (
                <div className="login-box">
                    <FaUser />
                    <ul>
                        <li>
                            <button type="button">관심목록</button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={handleLogout}
                            >
                                로그아웃
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </MovieLoginStatusContainer>
    );
};

export default MovieLoginStatus;
