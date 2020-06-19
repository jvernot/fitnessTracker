const Workout = require("../models/workouts.js");

module.exports = (app) => {

    //gets workouts from database
    app.get("api/workouts", (req, res) => {
        Workout.find()
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json(err);
            }) 
    });
    
    // for creating a new workout in the database
    app.post("/api/workouts", ( req, res) => {
        
        Workout.create({ type: "workout" })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log("Error creating new workout: ", err);
            res.status(400).json(err);
        })
    });

    //used in api.js to add an exercise to an exisiting workout
    app.put("/api/workouts/:id", ({ body, params }, res) => {
        Workout.findByIdAndUpdate(
            params.id,
            { $push: {exercises: body } }
        )
        .then(data => res.json(data))
        .catch(err => {
            console.log("Could not add exercise: ", err);
            res.json(err);
        })
    })

};