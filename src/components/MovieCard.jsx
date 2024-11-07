import {useNavigate} from "react-router-dom";

const MovieCard = ({data}) => {
    const baseUrl = "https://image.tmdb.org/t/p/w500";
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/details");
    };
    return (
        <div onClick={handleClick}>
            <img
                src={baseUrl + data.poster_path}
                alt={data.title}
            />
            <p className="movie-title">{data.title}</p>
            <p className="movie-average">평점 :{data.vote_average}</p>
        </div>
    );
};

export default MovieCard;
