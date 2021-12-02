import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Display from "../../icons/display.svg";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/loginActions";

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.login.userInfo);

  return (
    <header>
      <div
        style={{ backgroundColor: "#34495e" }}
        className="d-flex justify-content-around align-items-center py-2"
      >
        <h3 className="text-white">
          <img src={Display} alt="vidly" /> VIDLY
        </h3>
        {userInfo !== null ? (
          <div className="dropdown">
            <button
              className="btn btn-success dropdown-toggle"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {userInfo.username.toUpperCase()}
            </button>

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <Link className="dropdown-item" to="#">
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => dispatch(logoutUser())}
                  className="dropdown-item"
                  to="/"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link className="btn btn-primary btn-lg" to="/login">
            SIGN IN
          </Link>
        )}
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
