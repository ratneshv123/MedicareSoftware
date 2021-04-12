const express = require('express');
const connection = require('../../../db/db');
const router = express.Router();

router.get('/adddoc', (req,res)=>{
    var message='';
    res.render('./DOCTORS/adddoc',{message:message});
})
 
router.get('/updatedoc', (req, res) => {
    var mes = 0;
    res.render('./DOCTORS/updatedoc',{mesa:mes});
});

router.get('/viewdoc', async (req, res) => {
    var mes = 0;
    res.render('./DOCTORS/viewdoc',{mesa:mes});
});

/*----------------------------------------------------------------------------------------------------------*/

router.get('/addmed', async (req, res) => {
    const alluser = await new Promise((resolve, reject) => {
        const query = `select symptomsname from symptoms order by symptomsname;`;
        connection.query(query, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    console.log(alluser);
    var message = "";
    res.render('./MEDICINE/addmed', {message: message,users: alluser});
});

router.get('/viewmed', (req, res) => {
    var mesa = "";
    res.render('./MEDICINE/viewmed',{mesa:mesa});
});

router.get('/updatemed', (req, res) => {
    var mesa = "";
    res.render('./MEDICINE/updatemed',{mesa:mesa});
});

/*----------------------------------------------------------------------------------------------------------*/

router.get('/addsympt', (req, res) => {
    var message = "";
    res.render('./SYMPTOMS/addsympt', { message: message });
});

router.get('/updatesympt', (req,res)=>{
    res.render('./SYMPTOMS/updatesympt');
});

router.get('/viewsympt', (req, res) => {
    res.render('./SYMPTOMS/viewsympt');
});

module.exports = router;