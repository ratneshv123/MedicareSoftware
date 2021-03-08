const express = require('express');
const connection = require('../../db/db');
const router = express.Router();


router.post('/viewingdoctors', async (req, res) => {
    const user = {
        sortby: req.body.iprefname,
        prefeby: req.body.enterpref
    };
    console.log(user);
         const alluser=await new Promise((resolve, reject) => {
            var query = ``;
            if(user.sortby == 1)
            {
                query = `SELECT * FROM doctors ORDER BY doctorsname ASC`;
            }
            else if (user.sortby == 2)
            {
                query = `SELECT * FROM doctors where doctorsspeciality=?`;
            }
            else if (user.sortby == 3)
            {
                query = `SELECT * FROM doctors ORDER BY doctorsfees ASC`;
            } 
            else if (user.sortby == 4)
            {
                query = `SELECT * FROM doctors `;
            }    
            connection.query(query,user.prefeby,(err, result) => {
                if (err) reject(new Error('Something failed (Record Deletion) :' + err));
                resolve(result);
            });
        });       
        res.render('doctorsdetail',{users:alluser});
});



module.exports = router;