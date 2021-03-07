const express = require('express');
const connection = require('../../../db/db');
const router = express.Router();

router.get('/makeanappoinment', async (req, res) => {
    const alldoctor=await new Promise((resolve, reject) => {
        const query = `select doctorsname from doctors`;
        connection.query(query, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    console.log(alldoctor);
    res.render('makeanappoint',{ users: alldoctor});
});

router.post('/abcde', async(req, res) => {
    console.log(req.body);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    var firstday = today;
    dd++;
    var secondday = dd + '/' + mm + '/' + yyyy;
    dd++;
    var third = dd + '/' + mm + '/' + yyyy;
    dd++;
    var fourth = dd + '/' + mm + '/' + yyyy;
    dd++;
    var fifth = dd + '/' + mm + '/' + yyyy;
    const date = [[firstday], [secondday], [third], [fourth], [fifth]];
    const alldoctor=await new Promise((resolve, reject) => {
        const query = `select doctorsname from doctors`;
        connection.query(query, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    console.log(alldoctor);
    console.log(date[0]);
    
    res.render('makeanappoint',{ users:alldoctor,dates:date});
});


router.post('/checktime', (req, res) => {
    console.log(req.body);
    res.send('success');
});

module.exports = router;