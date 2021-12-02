import { loginActions } from "./loginSlice";
import axios from "axios";

/* Authenticate The User And Handle Login */
export function authenticateUser(email, password) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/auth", { email, password });

      dispatch(loginActions.getUserInfo(data));

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
      dispatch(loginActions.getError(err.response.data));
      setTimeout(() => {
        dispatch(loginActions.clearError());
      }, 5000);
    }
  };
}

/* Logout */
export function logoutUser() {
  return async (dispatch) => {
    dispatch(loginActions.userLogout());

    localStorage.removeItem("userInfo");
  };
}
