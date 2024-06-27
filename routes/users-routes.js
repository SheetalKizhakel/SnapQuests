//set up middleware which is responsible for handling routes related to users
const express=require('express');
const {check}=require('express-validator');
const router=express.Router();
const usersController=require('../controllers/users-controller')
const HttpError=require('../models/http-error');

router.get('/',usersController.getUsers)
router.post('/signup',[check('name').not().isEmpty(),check('email').normalizeEmail().isEmail(),check('password').isLength({min:6})],usersController.signup)
router.post('/login',usersController.login)
module.exports=router