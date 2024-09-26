const express = require('express')
const router = express.Router();
const Admin = require('../Models/AdminSchema');
const errorHandler = require('../Middlewares/errorMiddleware');
const adminTokenHandler = require('../Midllewares/checkAdmintoken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function createResponse(ok, message, data){
    return {
        ok,
        message,
        data
    }
}

router.post('/register', async(req, res, next) =>{
    try{
        const {name, email, password} = req.body;
        const existingAdmin = await Admin.findOne({email:email});
        if(existingAdmin){
            return res.status(409).json(createResponse(false," Admin with this email already Exists"))
        }
        const newAdmin = new Admin({
            name,password, email
            })
            await newAdmin.save()
            res.status(201).json(createResponse(true, 'User registered successfully'))
    }
    catch(err){
        next(err);
    }
});

router.post('/login', async(req, res, next) =>{
    try{
        const {email, password} = req.body;
        const admin = await Admin.findOne({email: email});
        if(!admin){
            return res.status(400).json(createResponse(false, "Invalida admin credentials"))
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch){
            return res.status(400).json(createResponse(false, "Invalid admin credentials"))
        }
        // generate admin authentication token if password matches
        const adminAuthToken = jwt.sign({adminId: admin._id}, process.env.JWT_ADMIN_SECRET_KEY, {expiresIn: '50m'});
        res.cookie('adminAuthToken', adminAuthToken, {httpOnly: true});
        res.status(200).json(createResponse(true, 'Admin Login Successful',{
            adminAuthToken
            
        }))
    }catch(err){
        next(err);
    }   
})

router.get('/checklogin', adminTokenHandler, async(req, res, next) =>{
    res.json({
        adminId: req.adminId,
        ok:true,
        message: 'Admin authenticated successfully!'
    })
})

router.use(errorHandler)

module.exports = router