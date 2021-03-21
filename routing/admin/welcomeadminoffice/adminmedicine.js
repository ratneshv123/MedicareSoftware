const express = require('express');
const connection = require('../../../db/db');
const router = express.Router();

//routes for updation/addition of medicines

router.post('/addthemedicine',async(req, res) => {

    console.log(req.body);
    const user = {
        medicinename: req.body.imediname,
        medicineusage: req.body.imediusage
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


module.exports = router;