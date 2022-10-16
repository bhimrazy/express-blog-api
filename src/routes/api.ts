import express, { Request, Response } from "express";
import blogRouter from "./blogRoutes";
import userRouter from "./userRoutes";

const apiRouter = express.Router();

apiRouter.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Welcome to your Express App API." });
});
apiRouter.use("/blogs", blogRouter);
apiRouter.use("/", userRouter);
export default apiRouter;
