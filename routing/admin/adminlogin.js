const express = require('express');
const connection = require('../../db/db');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/adminoffice', (req, res) => {
    var message = '';
    res.render('adminlogin',{message:message}); 
});

router.get('/welcomeadmin', (req, res) => {
    var message = '';
    res.render('inadmin',{message:message}); 
});

router.post('/welcomeadmin', async (req, res) => {
    console.log(req.body);
    var message='';    
    const user = {
        name: req.body.iusername,
        password: req.body.ipassword
    };

    await new Promise((resolve, reject) => {
        const query = `SELECT password FROM signinadmin WHERE username=?`;
        connection.query(query,user.name, (err, result) => {
            if (err) {
                res.status(404).send(`Not Found` + err);
                reject(new Error('Something failed (Record Insertion) :' + err));
            }
            if (result.length === 0)
            {
                message = "Invalid Username or Password or NULL value obtained";
                res.render('adminlogin', {message: message});
            }
            else
            {
                bcrypt.compare(user.password,result[0].password, (err, result) => {
                    if (result === true) {
                        console.log('success');
                        res.render('inadmin', {user: user});  
                    } 
                    else
                    {
                        console.log('failure');
                        message = "Invalid username or password";
                        res.render('adminlogin', {message:message});

                        reject(new Error('Something failed (Record Insertion) :' + err));
                    }
                });
            }
            resolve(result);
        });
    });
});

module.exports = router;