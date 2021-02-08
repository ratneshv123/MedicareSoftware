const express = require('express');
const connection = require('../../../db/db');
const router = express.Router();

router.get('/adddoc', (req,res)=>{
    var message='';
    res.render('adddoc', {message:message});
})

router.get('/viewdoc', (req,res)=>{
    res.render('viewdoc');
})

router.get('/updatedoc', (req,res)=>{
    res.render('updatedoc');
})

router.get('/addmed', (req, res) => {
    var message = "";
    res.render('addmed',{message:message});
})

router.get('/viewmed', (req,res)=>{
    res.render('viewmed');
})

router.get('/updatemed', (req,res)=>{
    res.render('updatemed');
})

router.get('/addsympt', (req, res) => {
    var message = "";
    res.render('addsympt',{message:message});
})

router.get('/viewsympt', (req,res)=>{
    res.render('viewsympt');
})

router.get('/updatesympt', (req,res)=>{
    res.render('updatesympt');
})


//routes for updation/addition of doctor

router.post('/addthedoctor', async(req, res) => {
    console.log(req.body);
    const user = {
        doctorsname: req.body.idrname,
        doctorsaddress: req.body.idraddress,
        doctorsfees: req.body.idrfees,
        doctorsspeciality: req.body.ispeciality
    };

    await new Promise((resolve, reject) => {
        const query = `INSERT INTO doctors SET ?`;
        connection.query(query, user, (err, result) => {
            if (err) reject(new Error('something is wrong:' + err));
            resolve(result);
        });
    });
    var message = "Doctors Added SuccessFully";
    res.render('adddoc',{message:message});
    //res.send('success'); 
});


//routes for updation/addition of medicines

router.post('/addthemedicine',async(req, res) => {
    console.log(req.body);
    const user = {
        medicinename: req.body.imediname,
        medicineusage: req.body.imediusage
    };

    await new Promise((resolve, reject) => {
        const query = `INSERT INTO medicine SET ?`;
        connection.query(query, user, (err, result) => {
            if (err) reject(new Error('something is wrong:' + err));
            resolve(result);
        });
    });
    var message = "Medicine Added SuccessFully";
    res.render('addmed',{message:message});
    //res.send('success'); 
});




//router for updation/addtion of symptoms

router.post('/addthesymptoms',async(req, res) => {
    console.log(req.body);
    const user = {
        symptomsname:req.body.isymname,
        symptomscategory: req.body.ispeciality
    };
    await new Promise((resolve, reject) => {
        const query = `INSERT INTO symptoms SET ?`;
        connection.query(query, user, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    var message = "Symptom Added SuccessFully";
    res.render('addsympt',{message:message});
});


module.exports = router;