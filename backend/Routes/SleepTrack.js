const express = require('express');
const router = require('router');
const authTokenHandler = require('../Midllewares/checkAuthtoken');
const errorHandler = require('../Middlewares/errorMiddleware');
const User = require('../Models/UserSchema');
const User = require('../Models/UserSchema');

function createResponse(ok, message, data){
    return {
        ok,
        message,
        data
    }
}

router.post('/addsleepentry', authTokenHandler, async(req, res, next) =>{
    const {date, durationInHrs} = req.body;
    const userId = req.userId;
    const user = await User.findById({_id: userId})
    if(!date || !durationInHrs)
    {
        return res.status(400).json(createResponse(false, 'Please provide sleep date and duration'))
    }
   user.sleep.push({
    date : new Date(date),
    durationInHrs
   })
   await user.save();
   res.json(createResponse(true, 'Sleep entry added successfully'))
})

router.post('/getsleepbydate', authTokenHandler, async(req, res, next) => {
    const {date } = req.body;
    const userId = req.userId;
    const user = await User.findById({_id: userId})

    if(!date){
        let date = new Date()
        user.sleep =filterByDate(user.sleep, date)
        res.json(createResponse(true, 'Sleep for date', user.sleep))
    }
    // if date is provided
    user.sleep = filterByDate(user.sleep, new Date(date))
    res.json(createResponse(true, 'Sleep entries for the date', user.sleep))
})
router.post('./deletesleepentry', authTokenHandler, async(req, res, next)=>{
    const {date} = req.body;
    const userId = req.userId;
    const user = await User.findById({_id: userId})

    if(!date)
    {
        return res.status(400).json(createResponse(false, 'Please Provide Date'))
    }
    user.sleep = user.sleep.filter(entry =>{
        return(
            new Date(entry.date).getDate() !== new Date(date).getDate() &&
            new Date(entry.date).getMonth() !== new Date(date).getMonth() &&
            new Date(entry.date).getFullYear() !== new Date(date).getFullYear() 
        )
    })
    await user.save();
    res.json(createResponse(true, 'Sleep entry deleted Successfully'))
 })

router.post('./getusersleep', authTokenHandler, async(req, res, next) =>{
    const userId = req.userId;
    const User = await User.findById({_id: userId});

        let goalSleep = 6;
        res.json(createResponse(true, 'User max sleep information', {goalSleep}))
})

function filterByDate(entries, targetDate){
    return entries.filter(entry => {
        const entryDate = new Date(entry.date);
        return (entryDate.getDate() === targetDate.getDate() && entryDate.getMonth() === targetDate.getMonth() && entryDate.getFullYear() === targetDate.getFullYear());
    })
}

module.exports= router