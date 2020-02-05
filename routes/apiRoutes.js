const Exercise = require("../models/exercise");
const Workout = require("../models/workout");
// const db = require("../models");

const express = require("express");
const router = express.Router();

router.get("/workouts", (req, res) => {
    Workout.find({}, function(err, data){
        console.log("Bloop Attack!")
        if (err) {console.log(err)}
        else {
            console.log('all workouts',data);
            res.send(data);
        }
    })
});


// client does not provide Range! XP
router.get("/workouts/range", (req, res) => {
    Workout.find({}).populate('exercises').exec(function(err, data){
        console.log("Range of workouts")
        if (err) {console.log(err)}
        else {
            console.log('range of workouts',data);
            res.send(data);
        }
    })
});



router.post("/workouts", (req, res) => {
    const newWorkout = new Workout({
        totalDuration: 0,
        exercises: []
    });
    newWorkout.save();
    console.log('new workout',newWorkout);

    res.json(newWorkout);
});


router.put("/workouts/:id", (req, res) => {

    const newExercise = new Exercise({
        type: req.body.type,
        name: req.body.name,
        duration: req.body.duration,
        distance: req.body.distance,
        weight: req.body.weight,
        reps: req.body.reps,
        sets: req.body.sets
    });
    newExercise.save().then(savingResponse => {
        // console.log(newExercise);
    
        console.log('saved new exercise, creating workout',req.params.id);
        // res.json(newExercise);
        
        Workout.findById(req.params.id, function(err, workout) {
            console.log(workout);
    
            workout.exercises.push(newExercise.id);
            workout.totalDuration += newExercise.duration;
            console.log(newExercise);
    
            workout.save();
            
            console.log(workout);
            res.json(newExercise);
        });
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