const express = require('express');
const con = require('../db/db');
const connection = require('../db/db');
const router = express.Router();

router.get('/consultus', async(req,res)=>{
    var message = "";
    const allsymptoms = await new Promise((resolve, reject) => {
        const query = `select symptomsname from symptoms`;
        connection.query(query, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    res.render('./MISC/consultus',{value4: allsymptoms,value1:message,value2:message,cards:0});
});

router.post('/checksymptomdoc', async(req,res)=>{
    var message = "";
    console.log(req.body);
    const user = {
        consultancyname: req.body.ifname,
        consultancyemail: req.body.iemail,
        consultancymobno: req.body.imobno,
        consultancysymtoms: req.body.isymptoms
    };
    const allsymptoms = await new Promise((resolve, reject) => {
        const query = `select symptomsname from symptoms`;
        connection.query(query, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    const alldoctors = await new Promise((resolve, reject) => {
        const query = `select doctorsname from doctors where doctorsspeciality in (select symptomscategory from symptoms where symptomsname = ?);`;
        connection.query(query,user.consultancysymtoms, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    console.log(user);
    console.log(alldoctors);
    res.render('./MISC/consultus',{value4: allsymptoms,value1:user,value2:alldoctors,cards:0});
});

router.post('/doctordetails', async(req,res)=>{
    var message = "";
    console.log(req.body);
    const user = {
        consultancyname: req.body.ifname,
        consultancyemail: req.body.iemail,
        consultancymobno: req.body.imobno,
        consultancysymtoms: req.body.isymptoms,
        consultancydoctors: req.body.idoctorname
    };
    const allsymptoms = await new Promise((resolve, reject) => {
        const query = `select symptomsname from symptoms`;
        connection.query(query, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    const alldoctors = await new Promise((resolve, reject) => {
        const query = `select doctorsname from doctors where doctorsspeciality in (select symptomscategory from symptoms where symptomsname = ?);`;
        connection.query(query,user.consultancysymtoms, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    await new Promise((resolve, reject) => {
        const query = `INSERT into consultancy SET ?`;
        connection.query(query,user, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    console.log(user);
    console.log(alldoctors);
    const doctordetail = await new Promise((resolve, reject) => {
        const query = `select * from doctors where doctorsname = ?`;
        connection.query(query,req.body.idoctorname, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    console.log(doctordetail);
    res.render('./MISC/consultus',{value4: allsymptoms,value1:user,value2:alldoctors,cards:1,value3:doctordetail});
});


module.exports = router;