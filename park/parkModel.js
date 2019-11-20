const db = require('../database/db-config')

module.exports = {
    addPark,
    findByNameAndCity,
    findAllParks,
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

function findByNameAndCity(name, city) {
    return db('park')
        .where({ name, city })
        .first()
}