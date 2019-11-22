const db = require('../database/db-config')

module.exports = {
    addRating,
    findRatingById,
    getRatings
}

function getRatings(id) {
    return db("rating as r")
        .join("park as p", "r.park_id", "p.id")
        .join("user as u", "r.user_id", "u.id")
        .select("r.rating", "r.comment", "p.name")
        .where("p.id", id);
}

async function addRating(rating) {
    const [id] = await db('rating').insert(rating, 'id')
    const newRating = await findRatingById(id)
    return newRating
}

function findRatingById(id) {
    return db("rating as r")
        .join('park as p', 'p.id', 'r.park_id')
        .join('user as u', 'u.id', 'r.user_id')
        .select(
            'r.id',
            'r.rating',
            'r.comment',
            'p.name as park',
            'u.username as user'
        )
        .where('r.id', id)
        .first();
}