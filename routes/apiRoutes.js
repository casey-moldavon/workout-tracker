const dbExercise = require("../models/exercise");
const dbWorkout = require("../models/workout");
const db = require("../models");

module.exports = function(app) {


    app.get("/workouts", function(req, res) {
        db.exercise.find({})
        .then(dbWorkout)
    })

    app.post("")
    db.workout.collection.create(body)    


    app.get("/library", (req, res) => {
        db.Library.find({})
          .then(dbLibrary => {
            res.json(dbLibrary);
          })
          .catch(err => {
            res.json(err);
          });
      });
    // app.get("/", function(req, res) {
    //   res.sendFile(path.join(__dirname, "../public"));
    // });
  
    // app.get("/exercise", function(req, res) {
    //   res.sendFile(path.join(__dirname, "../public/exercise.html"));
    // });
  
    // app.get("/stats", function(req, res) {
    //   res.sendFile(path.join(__dirname, "../public/stats.html"));
    // });
  };