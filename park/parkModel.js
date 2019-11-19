const db = require('../database/db-config')

module.exports = {
    addPark,
    findByNameAndCity,
    findAllParks,
    findById,
    removePark,
    updatePark,
}

function findAllParks() {
    return db('park')
}

function addPark(parkDetails) {
    return db('park')
        .insert(parkDetails, 'id')
        .then(arrayReturned => {
            const id = arrayReturned[0]
            return db('park')
                .where({ id })
                .first()
        })
}

async function updatePark(id, parkDetails) {
    await db('park').where({ id }).update(parkDetails)
    const updatedPark = await db('park').where({ id }).first()
    return updatedPark
}

function findByNameAndCity(name, city) {
    return db('park')
        .where({ name, city })
        .first()
}

function findById(id) {
    return db('park')
        .where({ id })
        .first()
}

function removePark(id) {
    return db('park')
        .where({ id })
        .del()
}