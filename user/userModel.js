const db = require('../database/db-config')

module.exports = {
    addUser,
    findByUsernameOrEmail,
}

function addUser(userDetails) {
    return db('user')
        .insert(userDetails, 'id')
        .then(idArray => {
            return db('user')
                .where({ id: idArray[0] })
                .select('id', 'username', 'name', 'email')
                .first()
        })
}

function findByUsernameOrEmail(userinfo) {
    return db('user')
        .where({ username : userinfo })
        .orWhere({ email :userinfo })
        .first()
}