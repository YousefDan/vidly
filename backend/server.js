const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectToMongodb = require("./db/connection");
const { notFound,errorHandler } = require("./middlewares/error");

dotenv.config();
connectToMongodb();
app.use(express.json());

app.use("/api/movies", require("./routes/movies"));
app.use("/api/genres", require("./routes/genres"));
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

app.use(notFound);
app.use(errorHandler);

/* Run The Server */
port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} on Port ${port}`)
);
