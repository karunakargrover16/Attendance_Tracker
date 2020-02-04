const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Exercise = require('./models/exercise.model');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/TTDB2",{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, (error)=>{
    if(!error)
    {
        console.log("Mongo Conection Successful .....");
    }
    else{
        console.log("Error Connecting.....");
    }
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
app.use('/exercise',exercisesRouter);
app.use('/users',usersRouter);
app.post('/incAttendence',(req,res)=>{
    Exercise.update({_id : req.body.id},{$inc : {Delivered : 1, Attended : 1} })
    .then(()=>{
        res.send("UPDATED")
    })
})

app.post('/decAttendence',(req,res)=>{
    Exercise.update({_id : req.body.id},{$inc : {Delivered : 1} })
    .then(()=>{
        res.send("UPDATED")
    })
})

const port = 5000
app.listen(port, ()=>{
    console.log('Server is running on port: 5000.....');
});