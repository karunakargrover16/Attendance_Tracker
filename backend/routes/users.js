const router = require('express').Router();
const User = require('../models/user.model');
require('../server');
var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
var express = require('express');
var app = express();

// router.use(require("express-session")({
//     secret: "My name is Lakshay Saini",
//     resave: false,
//     saveUninitialized: false
// }));

// router.use(passport.initialize());
// router.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.sendStatus(400).json('Error : '+ err));
});

router.route('/add').post((req, res) => {
    let user = new User;
    user.email = req.body.email;
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err)
        {
            res.send(err)
        }
        else{
            user.password = hash;
            user.course[0]="4";
            console.log(user)
            user.save()
            .then(()=>{
                res.send('submitted')
            })
            .catch((err)=>{
                res.send(err)
            })
        }
    })
   // const username = req.body.username;
   // const password = req.body.password;
   // const email = req.body.email;

    // User.register(new User({username: req.body.username , email: req.body.email}), req.body.password, function(err, user){
    //     if(err){
    //         console.log(err);
    //         return res.render('/users/add');
    //     }
    //     passport.authenticate("local")(req, res, function(){
    //         res.redirect("/exercise");
    //     })
    // })

   /* const newUser = new User({username, password, email});
    
    newUser.save()
    .then(() => res.json('User added !'))
    .catch(err => res.status(400).json('Error: ' + err)); */
});

// router.route('/login').get((req, res) => {
//     res.render("login");
// });

// router.route('/login', passport.authenticate("local" , {
//     successRedirect: '/exercise',
//     failureRedirect: '/users/login'
// })).post((req, res) => {
// });

router.post('/login',(req,res)=>{
    console.log(req.body)
    User.findOne({email : req.body.email})
    .then(docs=>{
        if(docs)
        {
            console.log("Encrypt");
            console.log(docs.password,req.body.password)
            bcrypt.compare(req.body.password,docs.password,(err,isMatched)=>{
                console.log(isMatched)
                if(err)
                {
                    res.send(err)
                }
                
                else if(isMatched)
                {
                    jwt.sign({id : docs._id},'KARUNAKAR',(err,token)=>{
                        if(err)
                        {
                            res.send(err);
                        }
                        res.send({token})
                    })
                }
                else{
                    res.send('Password incorrect')
                }
            })
        }
        else{
            res.send("User doesn't exist");
        }
    })
})

router.route('/logout').get((req, res) => {
    req.logOut();
    res.redirect("/users/login");
})






module.exports = router;