const Input = ({ label, input }) => {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={input.name}>
        {label}
      </label>
      <input id={input.name} className="form-control" {...input} />
    </div>
  );
};

export default Input;
