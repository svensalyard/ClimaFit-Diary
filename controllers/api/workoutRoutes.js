const express = require('express');
const router = express.Router();
const { Workout } = require('../../models');

// GET route to fetch all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout.findAll();
        res.json(workouts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST route to add a new workout
router.post('/', async (req, res) => {
    try {
        const newWorkout = await Workout.create(req.body);
        res.status(201).json(newWorkout);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT route to update a workout
router.put('/:id', async (req, res) => {
    try {
        const updatedWorkout = await Workout.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if (!updatedWorkout[0]) {
            res.status(404).json({ message: 'No workout found with this id' });
            return;
        }
        res.json(updatedWorkout);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE route to delete a workout
router.delete('/:id', async (req, res) => {
    try {
        const workoutData = await Workout.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!workoutData) {
            res.status(404).json({ message: 'No workout found with this id' });
            return;
        }
        res.json(workoutData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

