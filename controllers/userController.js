const user = require('../models/userSchema')
const jwt = require('jsonwebtoken')

module.exports.signupPage = (req, res) => {
    return res.render('./pages/signup')
}

module.exports.signup = async (req, res) => {
    try {
        let data = await user.create(req.body)
        console.log("User Created")
        return res.redirect('/user/login')
    } catch (error) {
        console.log(error)
        return res.redirect('/user/signup')
    }
}

module.exports.loginPage = (req, res) => {
    return res.render('./pages/login')
}

module.exports.login = (req,res) =>{
    try {
        return res.redirect('/')
    } catch (error) {
        console.log(error)      
    }
}

module.exports.logout = (req, res) => {
        return res.redirect('/user/login')

}

