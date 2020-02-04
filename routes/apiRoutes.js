const Exercise = require("../models/exercise");
const Workout = require("../models/workout");
// const db = require("../models");

const express = require("express");
const router = express.Router();

router.get("/workouts", (req, res) => {
    Exercise.find({}, function(err, data){
        console.log("Bloop Attack!")
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
    // console.log(newWorkout);

    res.json(newWorkout);
});


router.put("/workouts/:id", (req, res) => {

    const newExercise = new Exercise({
        type: req.body.type,
        name: req.body.name,
        duration: req.body.duration,
        weight: req.body.weight,
        reps: req.body.reps,
        sets: req.body.sets
    });
    newExercise.save();

    // console.log(newExercise);

    console.log(req.params.id);
    res.json(newExercise);
    
    Workout.findById(req.params.id, function(err, workout) {
        console.log(workout);

            workout.exercises.push(newExercise.id);
            console.log(newExercise);

            workout.save();
            
            console.log(workout);
            res.json(workout);
    });
});

// module.exports = function(app) {

//     app.get("/workouts", function(req, res) {
//         console.log("banana");
//         db.Exercise.find({})
//         .then()
//     })

//   };

module.exports = router;