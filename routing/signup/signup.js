const express = require('express');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const connection = require('../../db/db');
const {createToken} = require('../../models/user');
const router = express.Router();

router.get('/signup', (req,res)=>{
    var message = "";
    res.render('signup',{message:message});
});

router.post('/signupform', async(req, res) => {
    console.log(req.body);
    

    //validation starts from here

    
    const schema = Joi.object({
        FirstName: Joi.string().required(),
        LastName:Joi.string().required(),
        Email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).min(11).max(100).required(),
        Mobileno: Joi.string().min(10).max(10).required(),
        username:Joi.string().min(3).max(30).required(),
        Password: Joi.string().min(3).max(30)
    });
    
    const { error, value } = schema.validate({
        FirstName: req.body.ifname,
        LastName: req.body.ilname,
        Email: req.body.iemail,
        Mobileno: req.body.imobno,
        username: req.body.iusername,
        Password: req.body.ipassword
    });

    if (error != undefined)   
    {
        console.log(error);
        var success = "";
        res.render('signup', { message: error.details[0].message,success});
        // res.status(400).send(error.details[0].message);
        return;    
    }

//validation end here 

    const user = { 
        firstname: req.body.ifname,
        middlename: req.body.imname,
        lastname: req.body.ilname,
        email: req.body.iemail,
        mobno: req.body.imobno,
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
            if (err)
            {
                message = "Duplicate Entry"
                res.render('signup', {message:message});
            }
            resolve(result);
            message = 'SignUp Successfully';
        });
    });
    res.render('signup',{message:message});
});


router.post('/signin', async (req, res) => {
    console.log(req.body);


      //validation starts from here

    
      const schema = Joi.object({
        Username:Joi.string().min(3).max(30).required(),
        Password: Joi.string().min(1).max(30)
    });
    
    const { error, value } = schema.validate({
        Username: req.body.iusername,
        Password: req.body.ipassword
    });

    if (error != undefined)   
    {
        console.log(error);
        var success = "";
        res.render('home', { message: error.details[0].message,success});
        // res.status(400).send(error.details[0].message);
        return;    
    }

    //validation end here 

    var message='';    
    const user = {
        name: req.body.iusername,
        password: req.body.ipassword
    };

    const uservalue = await new Promise((resolve,reject)=>{
        const query = `Select * from signin where username = ?`;
        connection.query(query,user.name,(err, result)=> {
            if (err)    reject(new Error('Something failed (Record Updation) :'+err));
            resolve (result);
        });
    });

    await new Promise((resolve, reject) => {
        const query = `SELECT password FROM signin WHERE username=?`;
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
                bcrypt.compare(user.password,result[0].password, (err, result) => {
                    if (result === true) {
                        console.log('success');
                        var string = encodeURIComponent(req.body.iusername);
                        const token = createToken(uservalue[0].idsignin);
                        console.log(token);
                        res.cookie('jwt',token,{httpOnly:true,maxAge: 1000*2*24*60*60});
                        res.redirect('/welcomeuser?valid=' + string);
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

router.get('/signout', (req,res) => {
    res.cookie('jwt', '', {maxAge:1});
    res.redirect('/');
});

module.exports = router;