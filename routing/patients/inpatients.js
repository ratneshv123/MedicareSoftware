const express = require('express');
const connection = require('../../db/db');
const router = express.Router();

router.get('/welcomeuser', (req,res)=>{
    res.render('welcomeuser');
})

module.exports = router;