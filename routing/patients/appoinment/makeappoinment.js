const express = require('express');
const connection = require('../../../db/db');
const router = express.Router();

router.get('/makeanappoinment', (req,res)=>{
    res.render('makeanappoint');
});

module.exports = router;