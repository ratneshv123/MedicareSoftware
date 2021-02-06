const express = require('express');
const connection = require('../../../db/db');
const router = express.Router();

router.get('/adddoc', (req,res)=>{
    res.render('adddoc');
})

router.get('/updatedoc', (req,res)=>{
    res.render('updatedoc');
})

router.get('/addmed', (req,res)=>{
    res.render('addmed');
})

router.get('/updatemed', (req,res)=>{
    res.render('updatemed');
})

router.get('/addsympt', (req,res)=>{
    res.render('addsympt');
})

router.get('/updatesympt', (req,res)=>{
    res.render('updatesympt');
})

module.exports = router;