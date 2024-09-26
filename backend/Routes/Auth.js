const express = require('express')
const router = express.Router();
const User = require('../Models/userSchema');
const errorHandler = require('../Middlewares/errorMiddleware');
const authTokenHandler = require('../Midllewares/checkAuthtoken');
const jwt = require('jwtwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gamil',
    auth:{
        user : 'aashiiaggarwal19@gmail.com',
        pass: ''
    }
})

router.get('/test', async(req, res) =>{
    res.json({message: "API is working"})
})

function createResponse(ok, message, data){
    return {
    ok,
    message, 
    data
};
}

router.post('/register', async(req, res, next) =>{
    try{
        const {name, email, password, weightInKg, heightInCm, gender, dob, goal, activityLevel }= req.body;
        const existingUser = await User.findOne({email:email});
        if(existingUser){
            return res.status(409).json(createResponse(false," Email already Exists"))
        }
        const newUser = new User({
            name,password, email,
            weight:[
                {
                    weight: weightInKg,
                    unit: "kg",
                    date : Date.now()
                }
            ],
            height:[
                {
                    height: heightInCm,
                    unit: "cm",
                    date : Date.now()
                }
            ],
            gender, dob, goal, activityLevel
            })
            await newUser.save()
            res.status(201).json(createResponse(true, 'User registered successfully'))
    }
    catch(err){
        next(err);
    }
})
router.post('/login', async(req, res, next) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json(createResponse(false, "Invalid credentials"))
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json(createResponse(false, "Invalid credentials"))
        }
        const authToken = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '50m'});
        const refreshToken = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '100m'});

        res.cookie('authToken', authToken, {httpOnly: true});
        res.cookie('refreshToken', refreshToken, {httpOnly: true});
        res.status(200).json(createResponse(true, 'Login Successful',{
            authToken, refreshToken
        }))


    }
    catch(err){
        next(err);
    }
})
router.post('/sendotp', async(req, res, next) =>{
    try{}
catch(err){
    next(err);
}
})
router.post('/checklogin', authTokenHandler,async(req, res, next) =>{
    res.json({
        ok:true,
        message: 'User authenticated successfully!'
    })
})
router.use(errorHandler);
module.exports= router;