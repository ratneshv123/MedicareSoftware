const express = require('express');
const con = require('../../../db/db');
const connection = require('../../../db/db');
const router = express.Router();

//routes for updation/addition of medicines

router.post('/addthemedicine',async(req, res) => {

    console.log(req.body);
    const user = {
        medicinename: req.body.imediname,
        medicineusage: req.body.imediusage,
        symtomtype: req.body.iprefname
    };
    await new Promise((resolve, reject) => {
        const query = `INSERT INTO medicine SET ?`;
        connection.query(query, user, (err, result) => {
            if (err) reject(new Error('something is wrong:' + err));
            resolve(result);
        });
    });
    var message = "Medicine Added SuccessFully";
    res.render('addmed',{message:message});
});

router.post('/viewingmedicine', async (req, res) => {
    const user = {
        sortby: req.body.iprefname
    };
    
    const alluser=await new Promise((resolve, reject) => {
        var query=`select * from medicine`;
        if(user.sortby == 1)
        {
            var meg = 1;
            res.render('viewmed', { mesa: meg });
        }
        else if (user.sortby == 2) 
        {
            var meg = 2;
            res.render('viewmed', { mesa: meg });
        }
        connection.query(query,(err, result) => {
            if (err) reject(new Error('Something failed (Record Deletion) :' + err));
            resolve(result);
        });
    });  
    var meg = 0;
    res.render('viewmed',{users:alluser,mesa:meg});
});

router.post('/viewmedicinebyname', async (req, res) => {
    const user = {
        name: req.body.iname,
        value:req.body.ivalue
    };
    var mes = 0;
    const alluser=await new Promise((resolve, reject) => {
        var query;
        if (user.value == 1)
        {
            mes = 1;
            query = "SELECT * FROM medicine where medicinename like '%" + user.name + "%'";
        } 
        else if (user.value == 2)
        {
            mes = 2;
            query = "SELECT * from medicine where symtomtype like '%" + user.name + "%'";
        }
        connection.query(query,(err, result) => {
            if (err) reject(new Error('Something failed (Record Deletion) :' + err));
                resolve(result);
        });
    });
    console.log(alluser);
    res.render('viewmed',{users:alluser,mesa:mes});
});



module.exports = router;