const router = require('express').Router();
const user=require('../models/user.model')
const Exercise=require('../models/exercise.model')


router.route('/').post((req, res) => {
    console.log(req.body.email);
    user.findOne({email: req.body.email})
    .then(exercises =>{ 
        console.log(exercises.course);
        return res.json(exercises)})               //promise chaining..
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
     const courseName = req.body.courseName;
     const Attended = Number(req.body.Attended);
     const Delivered = Number(req.body.Delivered);
     const MinPer = Number(req.body.MinPer);

     const newExercise = new Exercise({
         courseName,
         Attended,
         Delivered,
         MinPer,
     });

     newExercise.save()
     .then((response) =>{ 
         console.log('course added');
         user.updateOne({email:req.body.email},{$push:{course:response._id}})
         .then(res1=>res.send('Exercise Added'))
     })
      //  return res.json('Exercise Added !!')}
     .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise Deleted..'))
    .catch(err => res.ststus(400).json('error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.courseName = req.body.courseName;
        exercise.Delivered = req.body.Delivered;
        exercise.Attended = req.body.Attended;
        exercise.MinPer = req.body.MinPer;

        exercise.save()
        .then(() => res.json('Exercise Updated .. !'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;