import MovieCard from "./MovieCard";
import styled from "styled-components";
const MovieSearchContainer = styled.div`
    img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
    .movie-average {
        display: none;
    }
`;
const MovieSearchList = ({searchData}) => {
    const limitedSearchData = searchData.slice(0, 5); // 5개만 보여주기
    return (
        <MovieSearchContainer className="flex items-center justify-center p-60 gap-x-8 mt-20 bg-midnightBlack text-white">
            {limitedSearchData &&
                limitedSearchData.length > 0 &&
                limitedSearchData.map(el => (
                    <MovieCard
                        data={el}
                        key={el.id}
                    />
                ))}
        </MovieSearchContainer>
    );
};

export default MovieSearchList;
