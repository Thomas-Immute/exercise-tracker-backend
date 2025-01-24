const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Workout Model Schema
const workoutSchema = new mongoose.Schema({
  exercise: String,
  weight: Number,
  reps: Number,
  date: { type: Date, default: Date.now }
});

const Workout = mongoose.model('Workout', workoutSchema);

// Routes
router.post('/workouts', async (req, res) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;