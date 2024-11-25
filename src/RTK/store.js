import {configureStore} from "@reduxjs/toolkit";
import {movieSlice, searchSlice, themeSlice, infiniteScrollSlice} from "./slice";

const store = configureStore({
    reducer: {
        movies: movieSlice.reducer,
        search: searchSlice.reducer,
        theme: themeSlice.reducer,
        infiniteScroll: infiniteScrollSlice.reducer,
    },
});

export default store;
