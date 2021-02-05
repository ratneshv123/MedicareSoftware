const express = require('express');
const connection = require('../../db/db');
const router = express.Router();

router.get('/signup', (req,res)=>{
    var message = "";
    res.render('signup',{message:message});
});

router.post('/signupform', async(req, res) => {
    console.log(req.body);
    const user = { 
        firstname: req.body.ifname,
        middlename: req.body.imname,
        lastname: req.body.ilname,
        state: req.body.istate,
        city: req.body.icity,
        zipcode: req.body.izip,
        username: req.body.iusername,
        password: req.body.ipassword
    };
    var message = '';
    //database work-> store the user
    await new Promise((resolve, reject)=> {
        //console.log(this);
        const query = `INSERT INTO signin SET ?`;
        
        connection.query(query, user, (err, result)=> {
            if (err)    reject(new Error('Something failed (Record Insertion) :'+err));
            resolve(result);
            message = 'SignUp Successfully';
        });
    });
    res.render('signup',{message:message});
});

module.exports = router;