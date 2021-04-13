const express = require('express');
const connection = require('../db/db');
const router = express.Router();

router.get('/viewrequest', async(req, res) => {
    const alluser=await new Promise((resolve, reject)=> {
        //console.log(this);
        const id = 0;
        const query = `SELECT * FROM signindoc where registered=?`;
        connection.query(query,id, (err, result)=> {
            if (err)    reject(new Error('Something failed (Record Deletion) :'+err));
            resolve (result);
        });
    });
    res.render('doctorrequest',{users:alluser});
});

router.post('/rejectdoctor', async (req, res) => {
    console.log(req.body);
    await new Promise((resolve, reject)=> {
        //console.log(this);
        const query = `DELETE FROM signindoc WHERE idsignindoc=?`;
        connection.query(query,req.body.doctorid, (err, result)=> {
            if (err)    reject(new Error('Something failed (Record Deletion) :'+err));
            resolve (result);
        });
    });
    res.redirect('/viewrequest');
});



router.post('/acceptdoctor', async (req, res) => {
    console.log(req.body);
    
    const alluser=await new Promise((resolve, reject)=> {
        //console.log(this);
        const id = 0;
        const query = `SELECT * FROM signindoc where idsignindoc=?`;
        connection.query(query,req.body.doctorid, (err, result)=> {
            if (err)    reject(new Error('Something failed (Record Deletion) :'+err));
            resolve (result);
        });     
    });
    console.log(alluser);

    const user = {
        doctorsname: req.body.doctorname,
        doctorsaddress: req.body.doctoraddress,
        doctorsfees: req.body.doctorfees,
        doctorsspeciality: req.body.doctorspeciality,
        doctorsemail: req.body.doctorsemail,
        doctorscontact: req.body.doctorsmobno,
        doctorsusername: alluser[0].signindocusername,
        doctorspassword:alluser[0].signindocpassword
    };

    await new Promise((resolve, reject) => {
        const query = `INSERT INTO doctors SET ?`;
        connection.query(query, user, (err, result) => {
            if (err) reject(new Error('something is wrong:' + err));
            resolve(result);
        });
    });

    await new Promise((resolve, reject)=> {
        const query = `DELETE FROM signindoc WHERE idsignindoc=?`;
        connection.query(query,req.body.doctorid, (err, result)=> {
            if (err)    reject(new Error('Something failed (Record Deletion) :'+err));
            resolve (result);
        });
    });

    res.redirect('/viewrequest');
});


module.exports = router;