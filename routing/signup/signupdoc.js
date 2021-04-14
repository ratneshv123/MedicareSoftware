const express = require('express');
const bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
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
        signindocspeciality: req.body.idrspeciality,
        signindocaddress: req.body.iaddress,
        signindocusername: req.body.iusername,
        signindocpassword: req.body.ipassword,
        signindocfees: req.body.ifees
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
            message = 'Request Registered Successfully';
        });
    });
    res.render('signupdoc',{message:message});
    // res.send('success');
});


router.post('/signindoc', async (req, res) => {
    console.log(req.body);
    // console.log('hello')
    var message='';    
    const user = {
        name: req.body.iusername,
        password: req.body.ipassword
    };

    await new Promise((resolve, reject) => {
        const query = `SELECT doctorspassword FROM doctors WHERE doctorsusername=?`;
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
                bcrypt.compare(user.password,result[0].doctorspassword, (err, result) => {
                    if (result === true) {
                        console.log('success');
                        res.render('doctorspage.ejs',{message:user.name});
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


// all appointment request

router.post('/allappointmentrequest', async(req, res) => {
    console.log(req.body);
    const user = {
        name: req.body.username,
        accepted: 0
    };    
    const data = [[user.name], [user.accepted]];
    console.log(data);
    const alluser= await new Promise((resolve, reject) => {
        const query = `select *  from appointment where doctorname=? and accepted=?`;
        connection.query(query,data,(err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    res.render('toacceptdoctorrequest',{users:alluser,message:req.body.username});
});

// accept appointment request

router.post('/acceptappointmentreq',async(req, res) => {
    console.log(req.body);
    const user = {
        accepted: 1,
        id: req.body.id
    };    
    const data = [[user.accepted],[user.id]];
   // console.log(data);
    await new Promise((resolve, reject) => {
        const query = `update appointment set accepted=? where idappointment=?`;
        connection.query(query,data,(err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });

    const alluser=await new Promise((resolve, reject) => {
        const query = `select doctorname from appointment where idappointment=?`;
        connection.query(query,user.id,(err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
   
    const user1 = {
        name: alluser[0].doctorname,
        accepted: 0
    };    
    const data1 = [[user1.name], [user1.accepted]];
    console.log(data1);
    const alluser1= await new Promise((resolve, reject) => {
        const query = `select *  from appointment where doctorname=? and accepted=?`;
        connection.query(query,data1,(err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });

    const mailsent= await new Promise((resolve, reject) => {
        const query = `select appointmentemail  from appointment where idappointment=?`;
        connection.query(query,user.id,(err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    
    // console.log('mail');
    // console.log(mailsent[0].appointmentemail);
    // console.log('mail');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'medicare375@gmail.com',
          pass: '485446011203'
        }
      });
      
      var mailOptions = {
        from: 'medicare375@gmail.com',
        to: mailsent[0].appointmentemail,
        subject: 'Appointment',
        text: 'Appointment Booked Successfully'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    res.render('toacceptdoctorrequest',{users:alluser1,message:alluser[0].doctorname});
});


//reject appointment request

router.post('/rejectappointmentreq', async(req, res) => {
    console.log(req.body);
    const user = {
        id:req.body.id
    };    
    const data = [[user.id]];
   // console.log(data);
   const alluser=await new Promise((resolve, reject) => {
    const query = `select doctorname from appointment where idappointment=?`;
    connection.query(query,user.id,(err, result) => {
        if (err) reject(new Error('Something Went Wrong+:' + err));
        resolve(result);
    });
   });
    
    await new Promise((resolve, reject) => {
        const query = `DELETE FROM appointment where idappointment=?`;
        connection.query(query,data,(err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    const user1 = {
        name: alluser[0].doctorname,
        accepted: 0
    };    
    const data1 = [[user1.name], [user1.accepted]];
    console.log(data1);
    const alluser1= await new Promise((resolve, reject) => {
        const query = `select *  from appointment where doctorname=? and accepted=?`;
        connection.query(query,data1,(err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    res.render('toacceptdoctorrequest',{users:alluser1,message:alluser[0].doctorname});
    
});

module.exports = router;