const express = require('express');
const app = express();
const home = require('./routing/home');
const signup = require('./routing/signup/signup');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set('view engine','ejs');

app.use('/', home);
app.use(signup);

app.listen(3000, ()=>console.log("Listening on port 3000"));