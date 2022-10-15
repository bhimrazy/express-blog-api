import express from 'express'
import blogRouter from './blogRoutes.js';
const apiRouter = express.Router()


apiRouter.get('/', (req, res) => {
    res.status(200).send({ 'message': 'Welcome to your Express App API.' })
});
apiRouter.use('/blogs', blogRouter)
export default apiRouter;