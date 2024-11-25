const bcrypt = require('bcryptjs')

const hashedPassword = async(password) =>{
    const hash = bcrypt.hash(password, 10);
    return hash;
}

module.exports =  hashedPassword;
