import {configureStore} from "@reduxjs/toolkit";
import {movieSlice, searchSlice, themeSlice} from "./slice";

const store = configureStore({
    reducer: {
        movies: movieSlice.reducer,
        search: searchSlice.reducer,
        theme: themeSlice.reducer,
    },
});

export default store;
