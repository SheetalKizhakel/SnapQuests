const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const User = require('../models/user');

// Function to get all users
async function getUsers(req, res, next) {
 let users
 try
 {
 users=await User.find({},'-password');//retrieve everything except password
 }
 catch(err)
 {
    const error=new HttpError(
        'Fetching users failed,please try again later',500
    );
    return next(error);
 }
 res.json({users:users.map(m=>m.toObject({getters:true}))})
};

// Function to sign up a new user
async function signup(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const { name, email, password} = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        return next(new HttpError('Signup failed, please try again later.', 500));
    }

    if (existingUser) {
        return next(new HttpError('User exists already, please login instead.', 422));
    }

    const createdUser = new User({
        name,
        email,
        image: 'https://www.esbnyc.com/sites/default/files/styles/on_single_feature/public/2019-10/home_banner-min.jpg?itok=OVtUHvyB',
        password,
        places:[]//here we have to establish the connection between users and places tables in the same database
    });

    try {
        await createdUser.save();
    } catch (err) {
        return next(new HttpError('Creating user failed, please try again.', 500));
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
}

// Function to log in a user
async function login(req, res, next) {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        return next(new HttpError('Login failed, please try again later.', 500));//error in the process of login
    }

    if(!existingUser||existingUser.password!==password)//if the user with that email does not exist or password mismatch
        {
            return next(new HttpError('Invalid credentials could not log in.', 401));
        }

    res.json({ message: 'Logged in!', user: existingUser.toObject({ getters: true }) });
}

module.exports = { getUsers, signup, login };
