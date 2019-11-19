const db = require('../database/db-Config')

module.exports = {
    addUser,
    findByUsernameOrEmail,
}

function addUser(userDetails) {
    return db('user')
        .insert(userDetails)
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