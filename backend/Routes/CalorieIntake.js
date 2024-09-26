const express = require('express')
const router = express.Router();
const authTokenHandler = require('../Midllewares/checkAuthtoken');
const errorHandler = require('../Middlewares/errorMiddleware');
const jwt = require('jsonwebtoken');
const User = require('../Models/UserSchema');
const request = require('request');

require('dotenv').config()

function createResponse(ok, message, data){
    return {
        ok,
        message,
        data
    }
}