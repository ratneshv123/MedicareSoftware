const express = require('express');
const connection = require('../../../db/db');
const {requireAuth} = require('../../../middleware/authmiddleware');
const router = express.Router();

router.get('/makeanappoinment', requireAuth, async (req, res) => {
    var message = "";
    const alldoctor=await new Promise((resolve, reject) => {
        const query = `select doctorsname from doctors`;
        connection.query(query, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
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
    console.log(alldoctor);
    res.render('./PATIENT/makeanappoint',{ users: alldoctor,dates:date,value:message,value4:message});
});



router.post('/checkavail', requireAuth, async (req, res) => {
    console.log(req.body);
    const user = {
        patientname: req.body.ifullname,
        appointmentemail:req.body.iemail,
        appointmentmobno:req.body.imobno,
        doctorname:req.body.iprefname,      
        appointmentdate:req.body.ibookdate,
        appointmenttime:req.body.ibooktime
    };
    const data = [[user.appointmentdate],[user.doctorname]];
    const alldates = await new Promise((resolve, reject) => {
        const query = `select timeslotscat from timeslots where timeslotscat not in (select timeslotscat from timeslots inner join appointment on appointment.appointmenttime = timeslots.timeslotscat where appointmentdate = ? and doctorname=?)`;
        connection.query(query,data,(err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    var message = "";
    const alldoctor=await new Promise((resolve, reject) => {
        const query = `select doctorsname from doctors`;
        connection.query(query, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
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
    console.log(user);
    res.render('./PATIENT/makeanappoint',{value4: alldates,value:user,dates:date,users:alldoctor});
});

router.post('/bookappoin', requireAuth, async(req, res) => {
    console.log(req.body);
    var message = "";
    const user = {
        patientname: req.body.ifullname,
        appointmentemail:req.body.iemail,
        appointmentmobno:req.body.imobno,
        doctorname:req.body.iprefname,      
        appointmentdate:req.body.ibookdate,
        appointmenttime:req.body.ibooktime
    };
    await new Promise((resolve, reject) => {
        const query = `INSERT into appointment SET ?`;
        connection.query(query,user,(err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    res.redirect('/makeanappoinment');
});


module.exports = router;