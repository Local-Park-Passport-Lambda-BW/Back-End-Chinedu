const db = require('../database/db-config')

module.exports = {
    addUser,
    findByUsernameOrEmail,
    findById,
    removeUser,
    updateUser
}

function findById(id) {
    return db('user')
                .where({ id })
                .select('id', 'username', 'name', 'email')
                .first()
}

function removeUser(id) {
    return db('user')
        .where({ id })
        .del()
}

async function updateUser(id, userDetails) {
    await db('user').where({ id }).update(userDetails)
    const updatedUser = await db('user').where({ id }).first()
    return updatedUser
}

async function addUser(userDetails) {
    const [id] = await db('user')
        .insert(userDetails, 'id');
    const newUser = await db('user')
        .where({ id })
        .select('id', 'username', 'name', 'email')
        .first()
    return newUser
}

function findByUsernameOrEmail(userinfo) {
    return db('user')
        .where({ username: userinfo })
        .orWhere({ email: userinfo })
        .first()
}