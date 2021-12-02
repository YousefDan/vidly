import { useDispatch } from "react-redux";
import { movieActions } from "../../store/movieSlice";

const ListGroup = ({ genres, selectedGenre }) => {
  const dispatch = useDispatch();
  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          onClick={() => dispatch(movieActions.setGenre(genre))}
          style={{ cursor: "pointer" }}
          key={genre._id}
          className={
            selectedGenre.name === genre.name
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
