const Exercise = require("../models/exercise");
const Workout = require("../models/workout");


const express = require("express");
const router = express.Router();


router.get("/workouts", (req, res) => {
    Exercise.find({}, function(err, data){
        if (err) {console.log(err)}
        else {
            console.log(data);
            res.send(data);
        }
    })
});


router.post("/workouts", (req, res) => {
    const newWorkout = new Workout({
        date: req.body.date,
        exercises: req.body.exercises
    });
    newWorkout.save();

    res.json(newWorkout);
});


router.put("/workouts/:id", (req, res) => {

    const newExercise = new Exercise({
        type: req.body.type,
        name: req.body.name,
        duration: req.body.duration,
        weight: req.body.duration,
        reps: req.body.reps,
        sets: req.body.sets
    });
    newExercise.save();
    res.json(newExercise);
    
    Workout.findById(req.params.id, function(err, workout) {

            workout.exercises.push(newExercise.id);
            workout.save();
            res.json(workout);
    });
});


module.exports = router;