import { movieActions } from "./movieSlice";

/* Fetch All Movies */
export function fetchMovies() {
  return async (dispatch) => {
    const response = await fetch("/api/movies");
    const data = await response.json();
    dispatch(movieActions.getMovies(data));
  };
}
/* Fetch All Genres */
export function fetchGenres() {
  return async (dispatch) => {
    const response = await fetch("/api/genres");
    const data = await response.json();
    dispatch(movieActions.getGenres(data));
  };
}
/* Update Like Movie*/
export function updateLike(movie) {
  const newMovie = { ...movie };
  newMovie.isLiked = !newMovie.isLiked;

  return async (dispatch) => {
    const response = await fetch(`/api/movies/${movie._id}`, {
      method: "PUT",
      body: JSON.stringify(newMovie),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!data) {
      return;
    }

    dispatch(movieActions.likedMovie(newMovie));
  };
}

/* Delete a Movie */
export function deleteMovie(id) {
  return async (dispatch) => {
    await fetch(`/api/movies/${id}`, {
      method: "DELETE",
    });

    dispatch(movieActions.delete(id));
  };
}
/* Create New Movie*/
export function createNewMovie(movie) {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/movies`, {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      dispatch(movieActions.addMovie(data));
    } catch (error) {
      console.log(error);
    }
  };
}

/* Update Movie*/
export function updateMovie(movie) {
  return async (dispatch) => {
    const response = await fetch(`/api/movies/${movie._id}`, {
      method: "PUT",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    dispatch(movieActions.update(data));
  };
}
