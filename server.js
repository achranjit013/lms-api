import "dotenv/config";
import express from "express";

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
import cors from "cors";
import morgan from "morgan";

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "your server is running well...",
  });
});

app.use("*", (req, res, next) => {
  const error = {
    message: "page not found",
    errorCode: 404,
  };
  next(error);
});

// error handler
app.use((error, req, res, next) => {
  console.log(error);
  const errorCode = error.errorCode || 500;

  res.status(errorCode).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`your server is running at: http://localhost:${PORT}`);
});
