const { render } = require('ejs');
const express = require('express');
const connection = require('../../../db/db');
const router = express.Router();

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

router.post('/viewingdr', async (req, res) => {
    const user = {
        sortby: req.body.iprefname
    };
    
        const alluser=await new Promise((resolve, reject) => {
        var query=`select * from doctors`;
        if(user.sortby == 1)
        {
            var meg = 1;
            res.render('viewdoc', { mesa: meg });
        }
        else if (user.sortby == 2) 
        {
            var meg = 2;
            res.render('viewdoc', { mesa: meg });
        }
        else if (user.sortby == 3)
        { 
            var meg = 0;
            query = `SELECT * FROM doctors ORDER BY doctorsfees ASC`;
        } 
        else if (user.sortby == 4)
        {
            query = `SELECT * FROM doctors `;
        }    
        connection.query(query,(err, result) => {
            if (err) reject(new Error('Something failed (Record Deletion) :' + err));
            resolve(result);
        });
    });  
    var meg = 0;
    res.render('viewdoc',{users:alluser,mesa:meg});
});

//router for viewthedr

router.post('/viewthedr', async (req, res) => {
    const user = {
        name: req.body.iname,
        value:req.body.ivalue
    };
    console.log(user);
    var mes = 0;
    const alluser=await new Promise((resolve, reject) => {
        var query = `SELECT * FROM doctors`;
    if (user.value == 1)
    {
        mes = 1;
        query = `SELECT * FROM doctors where doctorsname=?`;
    } 
    else if (user.value == 2)
    {
        mes = 2;
        query = `SELECT * FROM doctors where doctorsspeciality=?`; 
    }
        connection.query(query,user.name,(err, result) => {
            if (err) reject(new Error('Something failed (Record Deletion) :' + err));
                resolve(result);
        });
    });
    res.render('viewdoc',{users:alluser,mesa:mes});
});




//router for updation and deletion

router.post('/updatingdr', async (req, res) => {
    const user = {
        sortby: req.body.iprefname
    };
    
    const alluser=await new Promise((resolve, reject) => {
        var query = ``;
        if(user.sortby == 1)
        {
            var meg = 1;
            res.render('updatedoc', { mesa: meg });
        }
        else if (user.sortby == 2)
        {
            var meg = 2;
            res.render('updatedoc', { mesa: meg });
        }
        else if (user.sortby == 3)
        {
            var meg = 0;
            query = `SELECT * FROM doctors ORDER BY doctorsfees ASC`;
        } 
        else if (user.sortby == 4)
        {
            query = `SELECT * FROM doctors `;
        } 
        else if (user.sortby == 5)
        {
            var meg = 5;
            res.render('updatedoc', { mesa: meg });
        }    
        connection.query(query,(err, result) => {
            if (err) reject(new Error('Something failed (Record Deletion) :' + err));
            resolve(result);
        });
    });  
    var meg = 0;
    res.render('updatedoc',{users:alluser,mesa:meg});
});


//routes for updationofdoctors

router.post('/updatethedr', async (req, res) => {
    const user = {
        name: req.body.iname,
        value:req.body.ivalue
    };
    console.log(user);
    var mes = 0;
    const alluser=await new Promise((resolve, reject) => {
    var query;
    if (user.value == 1)
    {
        mes = 1;
        query = `SELECT * FROM doctors where doctorsname=?`;
    } 
    else if (user.value == 2)
    {
        mes = 2;
        query = `SELECT * FROM doctors where doctorsspeciality=?`; 
    } 
    else if (user.value == 5)
    { 
        mes = 5;
        query = `SELECT * FROM doctors where doctorsid=?`; 
    }
    connection.query(query,user.name,(err, result) => {
        if (err) reject(new Error('Something failed (Record Deletion) :' + err));
                resolve(result);
        });
    });
    res.render('updatedoc',{users:alluser,mesa:mes});
});

//routes for updating doctor details

router.post('/updatingdoctordetail', (req, res) => {
    console.log(req.body);
    const user = {
        id: req.body.doctorid,
        name: req.body.doctorname,
        address: req.body.doctoraddress,
        fees: req.body.doctorfees,
        speciality:req.body.doctorspeciality
    }
    res.render('updationindoc',{user:user}); 
});

//router for doctorupdatethe details 

router.post('/letupdatedoctordetails',async(req, res) => {
    console.log(req.body);
    const user = {
        id: req.body.id,
        name: req.body.name,
        address: req.body.address,
        fees: req.body.fees,
        speciality:req.body.speciality
    };    
    const data = [[user.name], [user.address], [user.fees], [user.speciality],[user.id]];

    await new Promise((resolve, reject)=> {
        //console.log(this);
        const query = `UPDATE doctors SET doctorsname=? , doctorsaddress=? , doctorsfees=? , doctorsspeciality=? WHERE doctorsid=? `;
        connection.query(query,data,(err, result)=> {
            if (err)    reject(new Error('Something failed (Record Updation) :'+err));  
            resolve(result);
           // console.log(result);
        });
    });
    res.render('updationindoc', { user: user });
});


router.post('/deletethedoctor', async(req, res) => {

    console.log(req.body);

    const user = {
        id: req.body.doctorid
    };
    await new Promise((resolve, reject)=> {
        //console.log(this);
        const query = `DELETE FROM doctors WHERE doctorsid=?`;
        
        connection.query(query, user.id, (err, result)=> {
            if (err)    reject(new Error('Something failed (Record Deletion) :'+err));
            resolve (result);
        });
    });
    const mesa = 0;
    res.render('updatedoc',{mesa:mesa});
});

module.exports = router;