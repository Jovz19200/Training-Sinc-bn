const bcryptjs = require('bcryptjs');


const comparePassword = async(password, hashedPassword) =>{
    return await bcryptjs.compare(password, hashedPassword);
}

module.exports = comparePassword