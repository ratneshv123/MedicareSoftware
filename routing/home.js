const express = require('express');
const con = require('../db/db');
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('home');
});

router.get('/contactus', (req,res)=>{
    res.render('contactus');
});

router.get('/signup', (req,res)=>{
    var message = "";
    res.render('signup',{message:message});
});

module.exports = router;