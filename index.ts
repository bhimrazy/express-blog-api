import dotenv from "dotenv";
dotenv.config();

import express, {
  Express,
  Request,
  Response,
  ErrorRequestHandler,
} from "express";

import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./src/configs/db";
import apiRouter from "./src/routes/api";
// Constants
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// App
const app: Express = express();
app.use(cors());
// parse request bodies (req.body)
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Serving static assets
app.use(express.static("public"));
// logger
app.use(morgan("combined"));

// API Routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Welcome to your Express App API." });
});

app.use("/api/v1/", apiRouter);

/* Error handler middleware */
app.use(((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
}) as ErrorRequestHandler);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

export default app;
