const express = require('express');
const router = express.Router();
const { Workout, WorkoutData } = require('../../models');

// GET route to fetch all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await WorkoutData.findAll();
        res.json(workouts);
    } catch (err) {
        console.error('Failed to fetch workouts:', err);
        res.status(500).json({ message: 'Internal server error', error: err });
    }
});

// POST route to add a new workout
router.post('/', async (req, res) => {
    try {
        const newWorkout = await WorkoutData.create(req.body);
        res.status(201).json(newWorkout);
    } catch (err) {
        console.error('Error adding workout:', err);
        res.status(400).json({ message: 'Error adding workout', error: err.toString() });
    }
});

// PUT route to update a workout
router.put('/:id', async (req, res) => {
    try {
        const updatedWorkout = await WorkoutData.update(req.body, {
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
        const workoutToDelete = await WorkoutData.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!workoutToDelete) {
            res.status(404).json({ message: 'No workout found with this id' });
            return;
        }
        res.json({ message: 'Workout deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route to fetch a single workout by ID
router.get('/:id', async (req, res) => {
    try {
        const workout = await WorkoutData.findByPk(req.params.id);
        if (!workout) {
            res.status(404).json({ message: 'No workout found with this id' });
            return;
        }
        res.json(workout);
    } catch (err) {
        console.error('Failed to fetch workout:', err);
        res.status(500).json({ message: 'Internal server error', error: err });
    }
});


module.exports = router;

