const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const SECRET_KEY = process.env.SECRET_KEY || 'user';
const TOKEN_COOKIE_NAME = 'auth_token';

// Generate JWT token
function generateToken(user) {
    return jwt.sign({ username: user.username, roles: user.roles }, SECRET_KEY, { expiresIn: '1h' });
}

// Register a user
module.exports.registerPage = (req, res) => {
    return res.render('./pages/signup')
}
module.exports.loginPage = (req, res) => {
    return res.render('./pages/login')
}

module.exports.register = async (req, res) => {
    const { username, password,email, roles } = req.body;
    const existingUser = await User.findOne({ username });
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, passwordHash,email, roles });

    if (!username || !password || !email || !roles) {
        return res.status(400).json({ message: 'Username, password, and roles are required.' });
    }

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
    }

    await newUser.save();
    return res.redirect('/user/login')
};

// Login a user
module.exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const token = generateToken(user);

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    res.cookie(TOKEN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    return res.redirect('/')
};

// Logout a user
module.exports.logout = (req, res) => {
        res.clearCookie(TOKEN_COOKIE_NAME);
        return res.redirect('/user/login')
};
