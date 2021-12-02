import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: [],
    moviePerPage: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: { _id: "1", name: "All Genres" },
    current: null,
  },
  reducers: {
    getMovies(state, action) {
      state.movies = action.payload;
    },
    likedMovie(state, action) {
      state.movies = state.movies.map((movie) =>
        movie._id === action.payload._id ? action.payload : movie
      );
    },
    delete(state, action) {
      state.movies = state.movies.filter(
        (movie) => movie._id !== action.payload
      );
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setNextPage(state) {
      state.currentPage++;
    },
    setPreviousPage(state) {
      state.currentPage--;
    },
    getGenres(state, action) {
      state.genres = [{ _id: "1", name: "All Genres" }, ...action.payload];
    },
    setGenre(state, action) {
      state.selectedGenre = action.payload;
      state.currentPage = 1;
    },
    addMovie(state, action) {
      state.movies = [...state.movies, action.payload];
    },
    setCurrent(state, action) {
      state.current = action.payload;
    },
    clearCurrent(state) {
      state.current = null;
    },
    update(state, action) {
      state.movies = state.movies.map((movie) =>
        movie._id === action.payload._id ? action.payload : movie
      );
    },
  },
});

const movieActions = movieSlice.actions;

export { movieSlice, movieActions };
