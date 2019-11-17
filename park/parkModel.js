const db = require('../database/db-config')

module.exports = {
    addPark,
}

function addPark(parkDetails) {
    return db('park')
        .insert(parkDetails)
        .then(arrayReturned => {
            const id = arrayReturned[0]
            return db('park')
                .where({rowid:id})
                .first()
        })
}