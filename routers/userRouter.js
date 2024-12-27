const { Router } = require("express")
const userController = require("../controllers/userController")

const userRouter = Router()

userRouter.get('/signup',userController.signupPage)
userRouter.post('/signup', userController.signup)
userRouter.get('/login', userController.loginPage)
userRouter.post('/login',userController.login)
userRouter.get('/logout', userController.logout)


module.exports = userRouter