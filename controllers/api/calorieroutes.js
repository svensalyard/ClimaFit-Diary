const express = require('express');
const router = express.Router();
const cron = require('node-cron');
const { CalorieData } = require('../../models');

// Fetch saved calorie data
router.get('/get', async (req, res) => {
    try {
        const userId = req.session.user_id;

        if (!userId) {
           
            return res.status(401).json({ message: "User not logged in" });
        }

        const date = new Date().toISOString().split('T')[0];

        const calorieRecord = await CalorieData.findOne({
            where: { userId, date }
        });

        res.json({ calories: calorieRecord ? calorieRecord.calories : 0 });
    } catch (err) {
        console.error("Error occurred: ", err);
        res.status(500).json({ error: err.message || 'Server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const userId = req.session.user_id;
        const { calories } = req.body;
        const date = new Date().toISOString().split('T')[0];
        const [calorieRecord, created] = await CalorieData.findOrCreate({
            where: { userId, date },
            defaults: { calories }
        });

        if (!created) {
            calorieRecord.calories += calories;
            await calorieRecord.save();
        }

        res.json({ message: 'Calories updated' });
    } catch (err) {
        console.error("Error occurred: ", err);
        res.status(500).json({ error: err.message || 'Server error' });
    }
});

// Reset calorie data at midnight
cron.schedule('0 0 * * *', async () => {
    const date = new Date().toISOString().split('T')[0];
    await CalorieData.update({ calories: 0 }, { where: { date } });
    console.log('Calories reset for the day');
});

module.exports = router;
