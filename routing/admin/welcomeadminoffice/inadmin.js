const { render } = require('ejs');
const express = require('express');
const connection = require('../../../db/db');
const router = express.Router();

router.get('/adddoc', (req,res)=>{
    var message='';
    res.render('adddoc',{message:message});
})
 
router.get('/updatedoc', (req, res) => {
    var mes = 0;
    res.render('updatedoc',{mesa:mes});
});

//router for viewing doctors in view tab

router.get('/viewdoc', async (req, res) => {
    var mes = 0;
    res.render('viewdoc',{mesa:mes});
});

router.get('/viewsympt', (req, res) => {
    res.render('viewsympt');
});

router.get('/addmed', (req, res) => {
    var message = "";
    res.render('addmed', { message: message });
});

router.get('/viewmed', (req, res) => {
    res.render('viewmed');
});

router.get('/updatemed', (req, res) => {
    res.render('updatemed');
});

router.get('/addsympt', (req, res) => {
    var message = "";
    res.render('addsympt', { message: message });
});

router.get('/updatesympt', (req,res)=>{
    res.render('updatesympt');
});


module.exports = router;