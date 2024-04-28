const express = require('express');

const {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
} = require("../controllers/workoutController");

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

// All workouts
router.get('/', getWorkouts)

// One workout
router.get('/:id', getWorkout)

// Create workout
router.post('/', createWorkout)

// Delete workout
router.delete('/:id', deleteWorkout)

// Update workout
router.patch('/:id', updateWorkout)

module.exports = router