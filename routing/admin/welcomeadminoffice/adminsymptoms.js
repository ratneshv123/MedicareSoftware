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
    res.render('./SYMPTOMS/addsympt',{message:message});
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
    
    res.render('./SYMPTOMS/updatesympt',{users:alluser});
});

router.post('/deletethesymptom', async(req, res) => {
    console.log(req.body);
   
    const user = {
        id: req.body.id
    };
    console.log(user.id);
    await new Promise((resolve, reject)=> {
        
        const query = `DELETE FROM symptoms WHERE idsymptoms=?`;
        connection.query(query, user.id, (err, result)=> {
            if (err)    reject(new Error('Something failed (Record Deletion) :'+err));
            resolve (result);
        });
    });
    
    res.render('./SYMPTOMS/updatesympt');
});


router.post('/updatingsymptom',async(req, res) => {
   
    console.log(req.body);

    const user = {
        id: req.body.id,
        name: req.body.name
    };

   const alluser=await new Promise((resolve, reject)=> {
        const query = `SELECT symptomscategory FROM symptoms where  idsymptoms=?`;
        connection.query(query, user.id, (err, result)=> {
            if (err)    reject(new Error('Something failed (Record Deletion) :'+err));
            resolve (result);
        });
    });

    console.log(alluser);
    const users = {
        id: req.body.id,
        name: req.body.name,
        speciality:alluser[0].symptomscategory
    };
    
    res.render('./SYMPTOMS/updationinsym',{user:users});
});

//letupdate the symptom now

router.post('/letupdatesymptomdetails',async(req, res) => {
    console.log(req.body);
    const user = {
        id: req.body.ismyid,
        name: req.body.ismyname,
        speciality:req.body.speciality
    };    
    console.log(user);
    const data = [[user.name], [user.speciality],[user.id]];

    await new Promise((resolve, reject)=> {
        //console.log(this);
        const query = `UPDATE symptoms SET symptomsname=? , symptomscategory=? WHERE idsymptoms=? `;
        connection.query(query,data,(err, result)=> {
            if (err)    reject(new Error('Something failed (Record Updation) :'+err));  
            resolve(result);
           // console.log(result);
        });
    });
     res.render('./SYMPTOMS/updationinsym', { user: user });
});


//viewing all symptoms

router.post('/viewingallsymptom',async(req, res) => {

    const alluser=await new Promise((resolve, reject)=> {
        const query = `SELECT idsymptoms,symptomsname,symptomscategory FROM symptoms`;
        connection.query(query, (err, result)=> {
            if (err)    reject(new Error('Something failed (Record Deletion) :'+err));
            resolve (result);
        });
    });
    res.render('./SYMPTOMS/viewsympt',{users:alluser});
    // res.send('success');
});

module.exports = router;