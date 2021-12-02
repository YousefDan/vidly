import Input from "../../components/movie/Input";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../../store/loginActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.login.error);
  const userInfo = useSelector((state) => state.login.userInfo);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(authenticateUser(email, password));
  };

  useEffect(() => {
    if (userInfo !== null) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <Fragment>
      <div className="w-50 p-3 rounded border bg-light shadow mx-auto">
        <form onSubmit={formSubmitHandler}>
          <Input
            label="Email Address"
            input={{
              type: "text",
              name: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
            }}
          />
          <Input
            label="Password"
            input={{
              type: "password",
              name: "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
            }}
          />
          <input value="SIGN IN" type="submit" className="btn btn-primary" />
        </form>
        <div className="mt-2">
          <span>New Custormer?</span>
          <span className="text-danger ms-2">Register</span>
        </div>
      </div>
      {error !== null && (
        <p className="alert alert-danger mt-2 w-50 mx-auto">{error}</p>
      )}
    </Fragment>
  );
};

export default Login;
