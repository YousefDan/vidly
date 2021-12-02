import { useDispatch } from "react-redux";
import { movieActions } from "../../store/movieSlice";

const Pagination = ({ currentPage, moviePerPage, items }) => {
  const dispatch = useDispatch();

  const pages = Math.ceil(items / moviePerPage);
  if (pages === 1) return null;

  if (items === 0) {
    return (
      <h6 className="alert alert-danger">This Genre Is Out Of Stock Now!</h6>
    );
  }

  return (
    <ul className="pagination">
      {currentPage !== 1 && (
        <li
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(movieActions.setPreviousPage())}
          className="page-item"
        >
          <span className="page-link">
            <span aria-hidden="true">&laquo;</span>
          </span>
        </li>
      )}
      {[...Array(pages).keys()].map((page) => (
        <li
          onClick={() => dispatch(movieActions.setCurrentPage(page + 1))}
          style={{ cursor: "pointer" }}
          key={page + 1}
          className={
            currentPage === page + 1 ? "page-item active" : "page-item"
          }
        >
          <span className="page-link">{page + 1}</span>
        </li>
      ))}
      {currentPage !== pages && (
        <li
          style={{ cursor: "pointer" }}
          onClick={() => dispatch(movieActions.setNextPage())}
          className="page-item"
        >
          <span className="page-link">
            <span aria-hidden="true">&raquo;</span>
          </span>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
