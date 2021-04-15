const express = require('express');
const connection = require('../db/db');
const router = express.Router();

router.get('/', (req,res)=>{
    var message=''
    res.render('home', {message:message});
});

router.get('/about', (req,res)=>{
    res.render('./MISC/about');
});

module.exports = router;