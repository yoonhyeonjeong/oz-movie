const MovieCard = ({data}) => {
    const baseUrl = "https://image.tmdb.org/t/p/w500";
    return (
        <div className="w-full">
            <div className="relative w-full pt-[150%]">
                <img
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src={baseUrl + data.poster_path}
                    alt={data.title}
                />
            </div>
            <p className="text-lg text-center mt-10">{data.title}</p>
            <p className="movie-average">평점 {data.vote_average}</p>
        </div>
    );
};

export default MovieCard;
