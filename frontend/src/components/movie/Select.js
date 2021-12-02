const Select = ({onChange, value}) => {
  return (
    <div className="mb-3">
      <label htmlFor="genre" className="form-label">
        Genre
      </label>
      <select
        value={value}
        onChange={onChange}
        id="genre"
        className="form-select"
        aria-label="Default select example"
      >
        <option value=""></option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Thriller">Thriller</option>
        <option value="Drama">Drama</option>
        <option value="Romance">Romance</option>
        <option value="Fantasy">Fantasy</option>
        <option value="MyStery">MyStery</option>
      </select>
    </div>
  );
};

export default Select;
