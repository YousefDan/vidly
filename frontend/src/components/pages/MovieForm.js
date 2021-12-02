import Input from "../movie/Input";
import Select from "../movie/Select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewMovie, updateMovie } from "../../store/movieActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { movieActions } from "../../store/movieSlice";

const MovieForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const current = useSelector((state) => state.movie.current);

  const [title, setTitle] = useState("");
  const [genreName, setGenreName] = useState("");
  const [numberInStock, setNumberInStock] = useState("");
  const [dailyRentalRate, setDailyRentalRate] = useState("");

  // clear state
  function clearState() {
    setTitle("");
    setGenreName("");
    setNumberInStock("");
    setDailyRentalRate("");
  }

  useEffect(() => {
    if (current !== null) {
      setTitle(current.title);
      setGenreName(current.genre.name);
      setNumberInStock(current.numberInStock);
      setDailyRentalRate(current.dailyRentalRate);
    } else {
      clearState();
    }
  }, [current]);

  // Form Submit Handler
  const submitFormHandler = (e) => {
    e.preventDefault();

    const values = Object.values({
      title,
      numberInStock,
      dailyRentalRate,
      genreName,
    });
    if (values.some((value) => value === "")) {
      toast.error("All The Inputs Are Required");
      return;
    }

    const movie = {
      title,
      genre: {
        name: genreName,
      },
      numberInStock: +numberInStock,
      dailyRentalRate: +dailyRentalRate,
    };

    if (current === null) {
      dispatch(createNewMovie(movie));
    } else {
      dispatch(updateMovie({ _id: current._id, ...movie }));
      dispatch(movieActions.clearCurrent());
    }

    clearState();
    navigate("/");
  };

  return (
    <div className="border rounded shadow p-3 bg-light w-50 m-auto my-3">
      <ToastContainer theme="colored" />
      <h2 className="text-center text-secondary">
        {current === null ? "Add Movie" : "Update Movie"}
      </h2>
      <form onSubmit={submitFormHandler}>
        <Input
          label="Title"
          input={{
            name: "title",
            type: "text",
            value: title,
            onChange: (e) => setTitle(e.target.value),
          }}
        />
        <Select
          value={genreName}
          onChange={(e) => setGenreName(e.target.value)}
        />
        <Input
          label="Number In Stock"
          input={{
            name: "numberInStock",
            type: "number",
            min: "0",
            value: numberInStock,
            onChange: (e) => setNumberInStock(e.target.value),
          }}
        />
        <Input
          label="DailyRentalRate"
          input={{
            name: "dailyRentalRate",
            type: "number",
            min: "0",
            value: dailyRentalRate,
            onChange: (e) => setDailyRentalRate(e.target.value),
          }}
        />
        <input
          type="submit"
          value={current === null ? "Add Movie" : "Update Movie"}
          className={current === null ? "btn btn-primary" : "btn btn-success"}
        />
      </form>
    </div>
  );
};

export default MovieForm;
