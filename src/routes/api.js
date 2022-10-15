import express from 'express'
import blogRouter from './blogRoutes.js';
import userRouter from './userRoutes.js';
const apiRouter = express.Router()


apiRouter.get('/', (req, res) => {
    res.status(200).send({ 'message': 'Welcome to your Express App API.' })
});
apiRouter.use('/blogs', blogRouter)
apiRouter.use('/', userRouter)
export default apiRouter;