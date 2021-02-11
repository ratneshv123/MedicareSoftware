const { render } = require('ejs');
const express = require('express');
const connection = require('../../../db/db');
const router = express.Router();



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

//router for viewing medicines
router.post('/viewsymptoms', async(req, res) => {
    console.log(req.body);
    //database work-> get all the users from database...
    const user = {
       symptomscategory:req.body.idrspeciality  
    };

     const alluser=await new Promise((resolve, reject) => {
        //console.log(this);
        const query = `SELECT idsymptoms,symptomsname FROM symptoms where symptomscategory=?`;

        connection.query(query,user.symptomscategory,(err, result) => {
            if (err) reject(new Error('Something failed (Record Deletion) :' + err));
            resolve(result);
        });
    });
    
    res.render('viewsympt',{users:alluser});
});

module.exports = router;