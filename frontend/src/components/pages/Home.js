import Table from "../movie/Table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres, fetchMovies } from "../../store/movieActions";
import Pagination from "../movie/Pagination";
import ListGroup from "../movie/ListGroup";

const Home = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.movies);
  const genres = useSelector((state) => state.movie.genres);
  const moviePerPage = useSelector((state) => state.movie.moviePerPage);
  const currentPage = useSelector((state) => state.movie.currentPage);
  const selectedGenre = useSelector((state) => state.movie.selectedGenre);

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchGenres());
  }, [dispatch]);

  /* Filter Movies By Its Genre */
  const filtered =
    selectedGenre._id !== "1"
      ? movies.filter((movie) => movie.genre.name === selectedGenre.name)
      : movies;

  /* paginate */
  const paginate = filtered.slice(
    (currentPage - 1) * moviePerPage,
    currentPage * moviePerPage
  );

  return (
    <div className="row">
      <div className="col-md-3">
        <ListGroup genres={genres} selectedGenre={selectedGenre} />
      </div>
      <div className="col-md-9">
        <Table movies={paginate} />
        <Pagination
          items={filtered.length}
          currentPage={currentPage}
          moviePerPage={moviePerPage}
        />
      </div>
    </div>
  );
};

export default Home;
