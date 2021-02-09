const { render } = require('ejs');
const express = require('express');
const connection = require('../../../db/db');
const router = express.Router();

router.get('/adddoc', (req,res)=>{
    var message='';
    res.render('adddoc', {message:message});
})

router.get('/updatedoc', (req, res) => {
    res.render('updatedoc');
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


//routes for updation/addition of doctor

router.post('/addthedoctor', async(req, res) => {
    console.log(req.body);
    const user = {
        doctorsname: req.body.idrname,
        doctorsaddress: req.body.idraddress,
        doctorsfees: req.body.idrfees,
        doctorsspeciality: req.body.idrspeciality
    };

    await new Promise((resolve, reject) => {
        const query = `INSERT INTO doctors SET ?`;
        connection.query(query, user, (err, result) => {
            if (err) reject(new Error('something is wrong:' + err));
            resolve(result);
        });
    });

    var message= "Doctors Added SuccessFully";
    res.render('adddoc',{message:message});
    //res.send('success'); 
});


//router for viewing doctors

router.get('/viewdoc', async (req, res) => {
    res.render('viewdoc');
});


router.post('/viewingdr', async (req, res) => {
    const user = {
        sortby: req.body.iprefname,
        prefeby: req.body.enterpref
    };
    console.log(user);
         const alluser=await new Promise((resolve, reject) => {
             var query = ``;
             if(user.sortby == 1)
             {
                 query = `SELECT * FROM doctors where doctorsname=?`;
             }
             else if (user.sortby == 2)
             {
                query = `SELECT * FROM doctors where doctorsspeciality=?`;
             }else
             if (user.sortby == 3)
              {
                     query = `SELECT * FROM doctors ORDER BY doctorsfees ASC`;
             } else
             if (user.sortby == 4)
             {
                    query = `SELECT * FROM doctors `;
             }    
            connection.query(query,user.prefeby,(err, result) => {
                if (err) reject(new Error('Something failed (Record Deletion) :' + err));
                resolve(result);
            });
        });       
        res.render('viewdoc',{users:alluser});
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