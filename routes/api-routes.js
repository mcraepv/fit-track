const path = require('path');
const db = require('../models');

module.exports = function (app) {
  app.get('/api/workouts', async (req, res) => {
    const dbWorkout = await db.Workout.find({}).populate({ path: 'exercises' });
    res.json(dbWorkout);
  });

  app.post('/api/workouts', async (req, res) => {
    req.body.date = Date.now();
    const dbWorkout = await db.Workout.create(req.body);
    console.log(dbWorkout);
    res.json(dbWorkout);
  });

  app.put('/api/workouts/:id', async (req, res) => {
    console.log(req.params.id, req.body);
    res.json(createExercise());

    async function createExercise() {
      const { _id } = await db.Exercise.create(req.body);
      return addToWorkout(_id);
    }

    async function addToWorkout(exerciseID) {
      const dbWorkout = await db.Workout.findByIdAndUpdate(
        req.params.id,
        { $push: { exercises: exerciseID } },
        { new: true }
      );
      return dbWorkout;
    }
  });

  app.get('/api/workouts/range', async (req, res) => {
    const dbWorkout = await db.Workout.find({}).populate({ path: 'exercises' });
    res.json(dbWorkout);
  });
};
