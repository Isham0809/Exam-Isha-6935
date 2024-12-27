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
module.exports.createUser=async(req,res)=>{
    try {
        await fetch('http://localhost:8081/user',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(req.body)
        })
        return res.redirect(req.get('Referrer')||'/')
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer')||'/')
    }
}

module.exports.logout = (req, res) => {
        return res.redirect('/user/login')

}

