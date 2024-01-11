const express = require('express');
const router = express.Router();
const { Workout } = require('../models');

// Add routes for handling workout data (CRUD operations)
// Example: GET route to fetch workouts
router.get('/workouts', async (req, res) => {
    try {
        const workouts = await Workout.findAll();
        res.json(workouts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
