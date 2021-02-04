const express = require('express');
const connection = require('../db/db');
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('home');
});

router.get('/meranaam', (req, res) => {
    console.log('success'); 
});

router.get('/contactus', (req,res)=>{
    res.render('contactus');
});

router.get('/about', (req, res) => {
    res.render('about'); 
});

router.get('/signup', (req,res)=>{
    var message = "";
    res.render('signup',{message:message});
});

<<<<<<< HEAD
router.get('/about', (req,res)=>{
    res.render('about');
})
=======
>>>>>>> ce819162876626c8eeb8e74b6023616fcd9f3c5b

module.exports = router;