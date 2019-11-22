const db = require('../database/db-config')

module.exports = {
    addPark,
    findByNameAndCity,
    findAllParks,
    findById,
    removePark,
    updatePark,
    addFacilityToPark,
    findParkFacility,
}

async function addFacilityToPark(facility) {
    await db('park_facility').insert(facility, 'park_id')
    const park = await db('park').where('id', facility.park_id)
    return park
}

function findParkFacility(id) {
    return db('park as p')
        .leftJoin('park_facility as pf', 'pf.park_id', 'p.id')
        .leftJoin('facility as f', 'f.id', 'pf.facility_id')
        .select('f.name', 'f.description').where('p.id', id)
}

function findAllParks() {
    return db("park as p")
        .leftJoin(
            "rating as r",
            "p.id",
            "r.park_id"
        )
        .select(
            "p.id",
            "p.name",
            "p.description",
            "p.city",
            "p.country"
        )
        .avg("r.rating as average_rating")
        .groupBy("p.name");
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
    return db('park as p')
        .leftJoin('rating as r', 'r.park_id', 'p.id')
        .avg('r.rating as average_rating')
        .select(
        "p.id",
        "p.name as park_name",
        "p.city",
        "p.country",
        "p.description as park_description"
        )
        .where("p.id", id)
        .first();
}

function removePark(id) {
    return db('park')
        .where({ id })
        .del()
}