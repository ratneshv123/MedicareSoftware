const express = require('express');
const con = require('../../../db/db');
const connection = require('../../../db/db');
const router = express.Router();

router.get('/makeanappoinment', async (req, res) => {
    var message = "";
    const alldoctor=await new Promise((resolve, reject) => {
        const query = `select doctorsname from doctors`;
        connection.query(query, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    console.log(alldoctor);
    res.render('./PATIENT/makeanappoint',{ users: alldoctor,dates:message,value:message});
});

router.post('/resetdr', async (req, res) => {
    const user = {
        firstname: req.body.ifirstname,
        lastname:req.body.ilastname,
        email:req.body.iemail,
        mobno:req.body.imobno,
        prefdoc:req.body.iprefname,
    };
    var message = "";
    const alldoctor=await new Promise((resolve, reject) => {
        const query = `select doctorsname from doctors`;
        connection.query(query, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    console.log(alldoctor);
    res.render('./PATIENT/makeanappoint',{ users: alldoctor,dates:message,value:user});
});

router.post('/abcde', async(req, res) => {
    const user = {
        firstname: req.body.ifirstname,
        lastname:req.body.ilastname,
        email:req.body.iemail,
        mobno:req.body.imobno,
        prefdoc:req.body.iprefname,
    };
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var datearray = [];
    for(var i=0;i<5;i++)
    {
        today = dd + '/' + mm + '/' + yyyy;
        datearray[i] = today;
        dd++;
    }
    const date = datearray;
    const alldoctor=await new Promise((resolve, reject) => {
            const query = `select doctorsname from doctors where doctorsname=?`;
            connection.query(query,user.prefdoc ,(err, result) => {
                    if (err) reject(new Error('Something Went Wrong+:' + err));
                    resolve(result);
                });
             });
    // const alldoctor = req.body.iprefname;
    console.log(alldoctor);
    console.log(date[0]);
    res.render('./PATIENT/makeanappoint',{users:alldoctor,dates:date,value:user});
});


router.post('/checktime', (req, res) => {
    console.log(req.body);
    const user = {
        firstname: req.body.ifirstname,
        lastname:req.body.ilastname,
        email:req.body.iemail,
        mobno:req.body.imobno,
        prefdoc:req.body.iprefname,      
        prefdate:req.body.ibookdate 
    };    
    console.log(user);
    res.send('success');
});


module.exports = router;