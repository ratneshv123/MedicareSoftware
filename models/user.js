const jwt = require('jsonwebtoken');

const maxAge = 2*24*60*60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRETKEY , {
        expiresIn: maxAge
    });
};

module.exports = {createToken};