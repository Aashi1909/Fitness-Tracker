const express = require('express')
const router = express.Router()
const User = require('../Models/UserSchema')
const errorHandler = require('../Middlewares/errorMiddleware')
const authTokenHandler = require('../Middlewares/checkAuthToken');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer  = require('nodemailer');