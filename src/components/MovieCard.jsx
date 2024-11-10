const MovieCard = ({data}) => {
    const baseUrl = "https://image.tmdb.org/t/p/w500";
    return (
        <div>
            <img
                src={baseUrl + data.poster_path}
                alt={data.title}
                className="h-500"
            />
            <p className="text-lg text-center mt-10">{data.title}</p>
            <p className="movie-average">평점 {data.vote_average}</p>
        </div>
    );
};

export default MovieCard;
