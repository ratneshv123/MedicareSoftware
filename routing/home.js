const express = require('express');
const connection = require('../db/db');
const router = express.Router();

router.get('/', (req,res)=>{
    var message=''
    res.render('home', {message:message});
});

router.get('/contactus', (req,res)=>{
    res.render('contactus');
});

router.get('/about', (req,res)=>{
    res.render('about');
})

router.get('/doctor', (req, res) => {
    res.render('doctorsdetail'); 
});

module.exports = router;