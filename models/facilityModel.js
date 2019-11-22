const db = require('../database/db-config')

module.exports = {
    addFacility,
    findAllFacilities,
    findById,
    removeFacility,
    updateFacility,
}

function findAllFacilities() {
    return db('facility')
}

function addFacility(facilityDetails) {
    return db('facility')
        .insert(facilityDetails, 'id')
        .then(arrayReturned => {
            const id = arrayReturned[0]
            return db('facility')
                .where({ id })
                .first()
        })
}

async function updateFacility(id, facilityDetails) {
    await db('facility').where({ id }).update(facilityDetails)
    const updatedFacility = await db('facility').where({ id }).first()
    return updatedFacility
}

function findById(id) {
    return db('facility')
        .where({ id })
        .first()
}

function removeFacility(id) {
    return db('facility')
        .where({ id })
        .del()
}