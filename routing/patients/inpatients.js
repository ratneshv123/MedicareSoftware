const express = require('express');
const connection = require('../../db/db');
const router = express.Router();

router.get('/welcomeuser', async(req,res)=>{
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
    console.log(alluser1,alluser2,alluser3);
    res.render('./PATIENT/welcomeuser', {value1:alluser1, value2: alluser2, value3: alluser3});
});

router.get('/viewdocforpat', async(req,res)=>{
    const alluser1 = await new Promise((resolve, reject) => {
        const query = `select * from doctors`;
        connection.query(query, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    console.log(alluser1);
    res.render('./PATIENT/ViewDocPatient',{users:alluser1});
});

router.get('/yourprofile', (req,res)=>{
    res.render('./PATIENT/viewpatient');
});

module.exports = router;