const crypto = require('crypto');
module.exports = {
    checkRole: (session, requiredRole) => {
        return (session && session.user && session.user.roles.includes[requiredRole]);
    },

    encryptPassword: (password) =>{
        return crypto.createHash('md5').update(password).digest("hex");
    }, 

    USER_ROLES: {
        USER:'USER',
        ADMIN: 'ADMIN'
    }
}