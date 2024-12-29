const { Router } = require("express")

const productRouter = require('./productRouter')
const categoryRouter = require("./categoryRouter")
const userRouter = require("./userRouter")
const authenticateToken = require("../middlewares/authenticate")


const router = Router()

router.get('/', authenticateToken, (req, res) => {
    res.render('index')
})
router.use('/user', userRouter)
router.use('/category',categoryRouter)
router.use('/product',productRouter)

module.exports = router