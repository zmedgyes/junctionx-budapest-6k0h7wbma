module.exports = {
    checkRole(session, requiredRole) {
        return (session && session.user && session.user.roles.includes[requiredRole]);
    },
    USER_ROLES: {
        USER:'USER',
        ADMIN: 'ADMIN'
    }
}