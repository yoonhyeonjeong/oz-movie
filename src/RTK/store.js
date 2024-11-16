import {configureStore} from "@reduxjs/toolkit";
import {movieSlice, searchSlice} from "./slice";

const store = configureStore({
    reducer: {
        movies: movieSlice.reducer,
        search: searchSlice.reducer,
    },
});

export default store;
