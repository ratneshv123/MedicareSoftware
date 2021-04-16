const express = require('express');
const connection = require('../../db/db');
const router = express.Router();

var session = '';

router.get('/welcomeuser', async(req,res)=>{
    console.log(req.query.valid);
    var passedvalue = req.query.valid;
    if(session.length==0)
        session = passedvalue;
    const alluser1 = await new Promise((resolve, reject) => {
        const query = `select count(idappointment) as value1 from appointment`;
        connection.query(query, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    const alluser2 = await new Promise((resolve, reject) => {
        const query = `select count(doctorsid) as value1 from doctors`;
        connection.query(query, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    const alluser3 = await new Promise((resolve, reject) => {
        const query = `select count(idsignin)  as value1 from signin`;
        connection.query(query, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    const alluser4 = await new Promise((resolve, reject) => {
        const query = `select * from signin where username=?`;
        connection.query(query,session,(err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    console.log(session);
    console.log(alluser1,alluser2,alluser3,alluser4);
    res.render('./PATIENT/welcomeuser', {value1:alluser1, value2: alluser2, value3: alluser3,value4: alluser4});
});

router.get('/viewdocforpat', async(req,res)=>{
    const alluser1 = await new Promise((resolve, reject) => {
        const query = `select * from doctors`;
        connection.query(query, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    const alluser4 = await new Promise((resolve, reject) => {
        const query = `select * from signin where username=?`;
        connection.query(query,session,(err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    console.log(alluser1);
    res.render('./PATIENT/ViewDocPatient',{users:alluser1,value4:alluser4});
});

router.get('/yourprofile', async(req,res)=>{
    const alluser1 = await new Promise((resolve, reject) => {
        const query = `select * from signin where username = ?`;
        connection.query(query,session, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    const alluser4 = await new Promise((resolve, reject) => {
        const query = `select * from signin where username=?`;
        connection.query(query,session,(err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    console.log(alluser1);
    res.render('./PATIENT/viewpatient',{value1:alluser1,value4: alluser4});
});

router.post('/completeprofile',(req,res)=>{
    var message='';
    res.render('./PATIENT/completeprofile',{message:message});
})

router.post('/donecompleting', async(req,res)=>{
    const user = {
        age: req.body.iage,
        gender: req.body.igender,
        height: req.body.iheight,
        weight: req.body.iweight,
        username: session
    };
    const data = [[user.age], [user.gender], [user.height], [user.weight],[user.username]];
    await new Promise((resolve, reject) => {
        const query = `UPDATE signin SET age=? , Gender=? , Height=? , Weight=? WHERE username=?`;
        connection.query(query,data, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
        res.redirect('/yourprofile');
    });
})

module.exports = router;