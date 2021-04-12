const express = require('express');
const app = express();
const home = require('./routing/home');
const signup = require('./routing/signup/signup');
const doctor = require('./routing/doctors/doctor');
const adminlogin = require('./routing/admin/adminlogin');
const inadmin = require('./routing/admin/welcomeadminoffice/inadmin');
const admindoctor = require('./routing/admin/welcomeadminoffice/admindoctor');
const adminmedicine = require('./routing/admin/welcomeadminoffice/adminmedicine');
const adminsymptoms = require('./routing/admin/welcomeadminoffice/adminsymptoms');
const inpatients = require('./routing/patients/inpatients');
const makeappoinment = require('./routing/patients/appoinment/makeappoinment');
const signupdoc = require('./routing/signup/signupdoc');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set('view engine','ejs');

app.use('/', home);
app.use(signup);
app.use(doctor);
app.use(adminlogin);
app.use(inadmin);
app.use(inpatients);
app.use(admindoctor);
app.use(adminmedicine);
app.use(adminsymptoms);
app.use(makeappoinment);
app.use(signupdoc);

app.listen(3000, ()=>console.log("Listening on port 3000"));