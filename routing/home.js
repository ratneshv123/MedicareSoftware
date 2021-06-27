const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.clearCookie('jwt');
    var message=''
    res.render('home', {message:message});
});

router.get('/about', (req,res)=>{
    res.render('./MISC/about');
});

module.exports = router;