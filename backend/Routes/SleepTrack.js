const express = require('express');
const router = express.Router();
const authTokenHandler = require('../Middlewares/checkAuthToken');
const errorHandler = require('../Middlewares/errorMiddleware');
const User = require('../Models/UserSchema')
const dayjs = require('dayjs');


function createResponse(ok, message, data){
    return {
        ok,
        message,
        data
    }
}

router.post('/addsleepentry', authTokenHandler, async (req, res, next) => {
    console.log('Cookies:', req.cookies); 
    const { date, durationInHrs } = req.body;
    const userId = req.userId;
    
    // Check if date and durationInHrs are provided
    if (!date || !durationInHrs) {
        return res.status(400).json(createResponse(false, 'Please provide sleep date and duration'));
    }

    try {
        const user = await User.findById({ _id: userId });
        if (!user) {
            return res.status(404).json(createResponse(false, 'User not found'));
        }

        // Add the sleep entry to the user
        user.sleep.push({
            date: new Date(date),
            durationInHrs
        });

        // Save the user document
        await user.save();

        // Respond with success after saving
        return res.json(createResponse(true, 'Sleep entry added successfully'));
    } catch (error) {
        // Catch any errors and send an appropriate response
        return res.status(500).json(createResponse(false, 'Server error'));
    }
});


router.post('/getsleepbydate', authTokenHandler, async(req, res, next) => {
    const {date } = req.body;
    const userId = req.userId;
    const user = await User.findById({_id: userId})

    if(!date){
        res.json(createResponse(true, 'Sleep for date', user.sleep))
    }
    else{
        // if date is provided
        user.sleep = filterByDate(user.sleep, new Date(date))
        res.json(createResponse(true, 'Sleep entries for the date', user.sleep))

    }
})
router.post('/deletesleepentry', authTokenHandler, async (req, res, next) => {
    const { date } = req.body; // This should be in YYYY-MM-DD format or similar
    const userId = req.userId;
    
    if (!date) {
        return res.status(400).json(createResponse(false, 'Please Provide Date'));
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json(createResponse(false, 'User not found'));
        }

        // Use dayjs to format both the stored date and the incoming date
        const formattedDate = dayjs(date).format('YYYY-MM-DD');

        user.sleep = user.sleep.filter(entry => {
            // Assuming entry.date is a string or Date object, format it for comparison
            const entryFormattedDate = dayjs(entry.date).format('YYYY-MM-DD');
            return entryFormattedDate !== formattedDate;
        });

        await user.save();
        res.json(createResponse(true, 'Sleep entry deleted successfully'));
    } catch (error) {
        console.error(error);
        res.status(500).json(createResponse(false, 'Internal server error'));
    }
});


router.use(errorHandler);

function filterByDate(entries, targetDate){
    return entries.filter(entry => {
        const entryDate = new Date(entry.date);
        return (entryDate.getDate() === targetDate.getDate() && entryDate.getMonth() === targetDate.getMonth() && entryDate.getFullYear() === targetDate.getFullYear());
    })
}

module.exports= router