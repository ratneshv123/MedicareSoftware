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
    const alluser = await new Promise((resolve, reject) => {
        const query = `select symptomsname from symptoms order by symptomsname;`;
        connection.query(query, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    var message = "Medicine Added SuccessFully";
    // res.redirect('./MEDICINE/addmed');
   res.render('./MEDICINE/addmed',{message:message,users: alluser});
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
            res.render('./MEDICINE/viewmed', { mesa: meg });
        }
        else if (user.sortby == 2) 
        {
            var meg = 2;
            res.render('./MEDICINE/viewmed', { mesa: meg });
        }
        connection.query(query,(err, result) => {
            if (err) reject(new Error('Something failed (Record Deletion) :' + err));
            resolve(result);
        });
    });  
    var meg = 0;
    res.render('./MEDICINE/viewmed',{users:alluser,mesa:meg});
});

router.post('/viewmedicinebyname', async (req, res) => {
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
    res.render('./MEDICINE/viewmed',{users:alluser,mesa:mes});
});


// updating the medicines

router.post('/updatingmedicine', async (req, res) => {
    const user = {
        name: req.body.iname,
        value:req.body.iprefname
    };
   console.log(req.body.iprefname);
    var mes = 0;
    const alluser=await new Promise((resolve, reject) => {
        var query;
        if (user.value == 1)
        {
            query = "select * from medicine order by medicinename asc";
        } 
        else if (user.value == 2)
        {
            query = "SELECT * from medicine ORDER BY symtomtype ASC";
        } else
        {
            query = "SELECT * from medicine ";
         }
        connection.query(query,(err, result) => {
            if (err) reject(new Error('Something failed (Record Deletion) :' + err));
                resolve(result);
        }); 
    });
    console.log(alluser);
   res.render('./MEDICINE/updatemed',{users:alluser,mesa:mes});
   // res.send('success');
});

//route for deleting the medicine 
router.post('/deletethemedicine', async(req, res) => {
    console.log(req.body);
    const user = {
        id:req.body.medicineid
    };
    await new Promise((resolve, reject)=> {     
        //console.log(this);
        const query = `DELETE FROM medicine WHERE idmedicine=?`;
        connection.query(query, user.id, (err, result)=> {
            if (err)    reject(new Error('Something failed (Record Deletion) :'+err));
            resolve (result);
        });
    });
   const alluser=await new Promise((resolve, reject) => {
       const query = `SELECT * FROM medicine`;
       connection.query(query, (err, result) => {
           if (err) reject(new Error('Something failed:' + err));
           resolve(result);
       });
    });
    res.render('./MEDICINE/updatemed',{users:alluser});
    //res.send('successs');   
    
});


//finalupdatemedicine

router.post('/updatethemedicine', async(req, res) => {
    console.log(req.body);
    const user = {
        id: req.body.medicineid,
        name: req.body.medicinename,
        usage: req.body.medicineusage,
        symptomname:req.body.symptomname
    };
    const alluser = await new Promise((resolve, reject) => {
        const query = `select symptomsname from symptoms order by symptomsname;`;
        connection.query(query, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
    res.render('./MEDICINE/updationinmed', { user: user,users: alluser });
});

//router for doctorupdatethe details 

router.post('/finalupdatemedicine',async(req, res) => {
    console.log(req.body);
    const user = {
        id: req.body.id,
        name: req.body.name,
        usage: req.body.usage,
        symptomname:req.body.symptomname
    };    
    const data = [[user.name],[user.usage],[user.symptomname],[user.id]];

    await new Promise((resolve, reject)=> {
        //console.log(this);
        const query = `UPDATE medicine SET medicinename=? , medicineusage=? , symtomtype=?  WHERE idmedicine=? `;
        connection.query(query,data,(err, result)=> {
            if (err)    reject(new Error('Something failed (Record Updation) :'+err));  
            resolve(result);
           // console.log(result);
        });
    });
    console.log(user);
    const alluser = await new Promise((resolve, reject) => {
        const query = `select symptomsname from symptoms order by symptomsname;`;
        connection.query(query, (err, result) => {
            if (err) reject(new Error('Something Went Wrong+:' + err));
            resolve(result);
        });
    });
     res.render('./MEDICINE/updationinmed', { user: user ,users: alluser});
   // console.log(data);
   //res.send('successs');
});

module.exports = router;