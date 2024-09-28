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
router.post('/addCalorieIntake', authTokenHandler, async(req, res, next) =>{
    const{items, date, quantity, quantityType} = req.body;
    if(!items || !date || !quantity || !quantityType){
        return res.status(400).json(createResponse(false, "Please provide all the required fields"))
    }
    let quantityInGrams = 0;
    if(quantityType === "g"){
        quantityInGrams = quantity;
    }
    else if(quantityType === "kg"){
        quantityInGrams = quantity * 1000;
    }
    else if(quantityType === "ml"){
        quantityInGrams = quantity;
    }
    else if(quantityType === "l"){
        quantityInGrams = quantity * 1000;
    }
    else{
        return res.status(400).json(createResponse(false, "Invalid quantity type"))
    } 
    var query = item;
    request.get({
        url: 'https://api.api-ninjas.com/v1/nutrition?query=' + query,
        headers: {
            'X-Api-Key': process.env.NUTRITION_API_KEY,
        },
    }, async function (error, response, body) {
        if (error) return console.error('Request failed:', error);
        else if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
        else {
            // body :[ {
            //     "name": "rice",
            //     "calories": 127.4,
            //     "serving_size_g": 100,
            //     "fat_total_g": 0.3,
            //     "fat_saturated_g": 0.1,
            //     "protein_g": 2.7,
            //     "sodium_mg": 1,
            //     "potassium_mg": 42,
            //     "cholesterol_mg": 0,
            //     "carbohydrates_total_g": 28.4,
            //     "fiber_g": 0.4,
            //     "sugar_g": 0.1
            // }]

            body = JSON.parse(body);
            let calorieIntake = (body[0].calories / body[0].serving_size_g) * parseInt(qtyingrams);
            const userId = req.userId;
            const user = await User.findOne({ _id: userId });
            user.calorieIntake.push({
                item,
                date: new Date(date),
                quantity,
                quantitytype,
                calorieIntake: parseInt(calorieIntake)
            })

            await user.save();
            res.json(createResponse(true, 'Calorie intake added successfully'));
        }
    });

})
router.post('/getCalorieIntakeByDate', authTokenHandler, async(req, res, next) =>{

    const {date} = req.body;
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });
    if(!date){
        let date = new Date();
        // this is just extracting date from calorieIntakearray and comapring it with date
        user.calorieIntake = filterByDate(user.calorieIntake, date); 
        return res.json(createResponse(true, 'Calorie intake for today', user.calorieIntake));
    }
    // if date is provided
    user.calorieIntake = filterByDate(user.calorieIntake, new Date(date));
    res.json(createResponse(true, 'Calorie intake for selected date', user.calorieIntake));
}) 

router.post('/getCalorieIntakeByLimit', authTokenHandler, async(req, res, next) =>{

    const {limit} = req.body;
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });
    if(!limit){
        return res.status(400).json(createResponse(false, "Please provide limit"))
    }
    // complete array intake
    else if(limit === 'all'){
        res.json(createResponse(true, 'Calorie intake for selected limit', user.calorieIntake));
    }
    else{
        let date = new Date();
        let currentDate = new Date(date.setDate(date.getDate() - parseInt(limit))).getTime();
        // 1678910

        user.calorieIntake = user.calorieIntake.filter((item) => {
            return new Date(item.date).getTime() >= currentDate;
        })
        res.json(createResponse(true, `Calorie intake for last ${limit} days`, user.calorieIntake));
    }
})
router.post('/deleteCalorieIntake', authTokenHandler, async(req, res, next) =>{
    const {item, date} = req.body;
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });

    if(!item || !date){
        return res.status(400).json(createResponse(false, "Please provide item and date"))
    }
    // creates a new array that excludes the entry that matches both the item and date provided.
    user.calorieIntake = user.calorieIntake.filter((entry) => {
        return entry.item !== item || entry.date !== date
    })
    await user.save();
    res.json(createResponse(true, 'Calorie intake deleted successfully'));
})
router.post('/getGoalCalorieIntake', authTokenHandler, async(req, res, next) =>{
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });
    let maxCalories = 0;
    // get the latest height and latest weight
    let heightInCm = parseFloat(user.height[user.height.length - 1].height);
    let weightInKg = parseFloat(user.weight[user.weight.length - 1].weight);
    let age = new Date().getFullYear() - new Date(user.dob).getFullYear();
    let BMR = 0;
    let gender = user.gender;
    if(gender === "male"){
        BMR = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age); /* standard calculation for calculation of bmr of male */
    }
    else if(gender === "female"){
        BMR = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age); /* standard calculation for calculation of bmr of female */
    }
    else{
        BMR = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age); /* standard calculation for calculation of bmr of others */
    }
    if (user.goal == 'weightLoss') {
        maxCalorieIntake = BMR - 500;
    }
    else if (user.goal == 'weightGain') {
        maxCalorieIntake = BMR + 500;
    }
    else {
        maxCalorieIntake = BMR;
    }

    res.json(createResponse(true, 'max calorie intake', { maxCalorieIntake }));
})

function filterByDate(entries, targetDate){
    return entries.filter(entry => {
        const entryDate = new Date(entry.date);
        return (entryDate.getDate() === targetDate.getDate() && entryDate.getMonth() === targetDate.getMonth() && entryDate.getFullYear() === targetDate.getFullYear());
    })
}

module.exports= router