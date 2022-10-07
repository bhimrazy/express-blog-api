
import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send({ 'message': 'Welcome to your Express App API.' })
});

const apiRouter = router
export default apiRouter;