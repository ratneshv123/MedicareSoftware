const express = require('express');
const connection = require('../../../db/db');
const router = express.Router();

router.get('/adddoc', (req,res)=>{
    var message='';
    res.render('adddoc',{message:message});
})
 
router.get('/updatedoc', (req, res) => {
    var mes = 0;
    res.render('updatedoc',{mesa:mes});
});

router.get('/viewdoc', async (req, res) => {
    var mes = 0;
    res.render('viewdoc',{mesa:mes});
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
    res.render('addmed', {message: message,users: alluser});
});

router.get('/viewmed', (req, res) => {
    var mesa = "";
    res.render('viewmed',{mesa:mesa});
});

router.get('/updatemed', (req, res) => {
    res.render('updatemed');
});

/*----------------------------------------------------------------------------------------------------------*/

router.get('/addsympt', (req, res) => {
    var message = "";
    res.render('addsympt', { message: message });
});

router.get('/updatesympt', (req,res)=>{
    res.render('updatesympt');
});

router.get('/viewsympt', (req, res) => {
    res.render('viewsympt');
});

module.exports = router;