const express = require("express");

const app = express();
const port = 3000;
const anodeRouter = require("./routes/anode");
const helmet = require("helmet");

app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/user", function (req, res) {
  res.json({ message: "ok" });
});

app.use("/anode", anodeRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log("Example app listening at http://localhost:${port}");
});
