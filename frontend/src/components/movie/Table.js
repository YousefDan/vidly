import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { deleteMovie, updateLike } from "../../store/movieActions";
import Like from "./Like";
import { Link } from "react-router-dom";
import { movieActions } from "../../store/movieSlice";

const Table = ({ movies }) => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <Link onClick={() => dispatch(movieActions.clearCurrent())} className="btn btn-info" to="/movie-form">
        ADD NEW MOVIE
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th>Like</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>
                <Link
                  onClick={() => dispatch(movieActions.setCurrent(movie))}
                  style={{ textDecoration: "none" }}
                  to="/movie-form"
                >
                  {movie.title}
                </Link>
              </td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like
                  onLike={() => dispatch(updateLike(movie))}
                  isLiked={movie.isLiked}
                />
              </td>
              <td>
                <button
                  onClick={() => dispatch(deleteMovie(movie._id))}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Table;
