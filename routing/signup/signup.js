const express = require('express');
const bcrypt = require('bcryptjs');
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
        email: req.body.iemail,
        mobno: req.body.imobno,
        city: req.body.icity,
        state: req.body.istate,
        zipcode: req.body.izip,
        username: req.body.iusername,
        password: req.body.ipassword
    };

    //added hashing for bcrypting password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    //ending of bcrypting password

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


router.post('/signin', async (req, res) => {
    console.log(req.body);    
    const user = {
        name: req.body.iusername,
        password: req.body.ipassword
    };
    
        await new Promise((resolve, reject) => {
            const query = `SELECT password FROM signin WHERE username=?`;
            connection.query(query,user.name, (err, result) => {
                if (err) {
                    res.status(404).send(`Not Found` + err);
                    reject(new Error('Something failed (Record Insertion) :' + err));
                }
                if (result.length === 0)
                {
                    res.send('Invalid Email or Password');
                }
                 else
                {
                    bcrypt.compare(user.password,result[0].password, (err, result) => {
                        if (result === true) {
                            console.log('success');
                           res.render('welcomeuser', {user: user});  
                        } else
                        {
                         console.log('failure');
                        res.status(404).send(`Not Found` + err);
                        reject(new Error('Something failed (Record Insertion) :' + err));
                        }
                    });
                }
                resolve(result);
            });
        });
});

module.exports = router;