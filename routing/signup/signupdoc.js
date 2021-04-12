const express = require('express');
const bcrypt = require('bcryptjs');
const connection = require('../../db/db');
const router = express.Router();

router.get('/signupdoc', (req,res)=>{
    var message = "";
    res.render('signupdoc',{message:message});
});

router.post('/signupdocform', async(req, res) => {
    console.log(req.body);
    const user = { 
        signindocname: req.body.ifname,
        signindocemail: req.body.iemail,
        signindocmob: req.body.imobno,
        signindocusername: req.body.iusername,
        signindocpassword: req.body.ipassword
    };
    
    //added hashing for bcrypting password
    const salt = await bcrypt.genSalt(10);
    user.signindocpassword = await bcrypt.hash(user.signindocpassword, salt);
    //ending of bcrypting password

    var message = '';
    //database work-> store the user
    await new Promise((resolve, reject)=> {
        //console.log(this);
        const query = `INSERT INTO signindoc SET ?`;
        
        connection.query(query, user, (err, result)=> {
            if (err)
            {
                message = "Duplicate Entry"
                res.render('signupdoc', {message:message});
            }
            resolve(result);
            message = 'SignUp Successfully';
        });
    });
    res.render('signupdoc',{message:message});
});


router.post('/signindoc', async (req, res) => {
    console.log(req.body);
    var message='';    
    const user = {
        name: req.body.iusername,
        password: req.body.ipassword
    };

    await new Promise((resolve, reject) => {
        const query = `SELECT signindocpassword FROM signindoc WHERE signindocusername=?`;
        connection.query(query,user.name, (err, result) => {
            if (err) {
                res.status(404).send(`Not Found` + err);
                message="Invalid Username or Password or NULL value obtained";
                res.render('home',{message:message});
                reject(new Error('Something failed (Record Insertion) :' + err));
            }
            if (result.length === 0)
            {
                message = "Invalid Username or Password or NULL value obtained";
                res.render('home', {message: message});
            }
            else
            {
                bcrypt.compare(user.password,result[0].signindocpassword, (err, result) => {
                    if (result === true) {
                        console.log('success');
                        res.render('doctorspage.ejs');
                    } 
                    else
                    {
                        console.log('failure');
                        message = "Invalid username or password";
                        res.render('home', {message:message});
                        reject(new Error('Something failed (Record Insertion) :' + err));
                    }
                });
            }
            resolve(result);
        });
    });
});

module.exports = router;